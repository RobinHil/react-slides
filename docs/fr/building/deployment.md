# Déploiement

Le site est entièrement statique : `pnpm build` produit un dossier `dist/` qui contient la page d'accueil, une page par présentation, et leurs fichiers. `pnpm docs:build` y ajoute ce guide dans `dist/docs/` ; il demande Python et Zensical, installés avec `pip install -r docs/requirements.txt`.

## Captures d'écran

Les aperçus de partage des présentations et les images de ce guide sont des fichiers du dépôt, pris sur le site construit par un seul script, dans le conteneur de test pour qu'ils soient identiques quelle que soit la machine :

```bash
docker compose -f docker/compose.test.yml run --rm test sh -c "pnpm build && pnpm screenshots"
```

Il écrit `src/decks/<présentation>/preview.png` pour chaque présentation et, pour chaque langue de ce guide, les images de l'interface et de chaque diapositive de la démo dans `docs/<langue>/images/`. Relancez-le après avoir changé l'interface, la première diapositive d'une présentation ou la démo.

## Tests

Le dépôt contient une suite de tests : des tests unitaires avec Vitest (`tests/unit/`), et des tests de bout en bout avec Playwright (`tests/e2e/`) qui pilotent le site construit dans Chromium et Firefox, et sur un téléphone. Ils parcourent la page d'accueil, la navigation, la barre d'outils à toutes les largeurs, les panneaux, le plein écran, le mode présentateur, l'export PDF, chaque composant de la démo, les deux langues, l'accessibilité, la politique de sécurité du contenu de la production, les fichiers du build, et comparent des captures de l'interface et de chaque diapositive à celles du dépôt.

Ils tournent dans un conteneur, celui de la CI, pour que les captures soient dessinées partout de la même façon :

```bash
pnpm test:docker                                                   # toute la suite
docker compose -f docker/compose.test.yml run --rm test pnpm test:update   # après un changement visible : reprendre les captures
```

`pnpm test:unit` lance seuls les tests unitaires, sans conteneur. Le rapport du dernier passage est dans `playwright-report/`. Un test qui échoue après un changement voulu de l'interface ou de la démo demande de reprendre les captures, et de les vérifier avant de commiter.

## GitHub Pages

Chaque push sur `main` lance `.github/workflows/pages.yml` : il lance les tests, vérifie le code, construit le site et ce guide pour l'adresse donnée par Pages, contrôle que chaque présentation a sa page et son aperçu et que le guide est là, publie, puis relit en ligne la page d'accueil, les présentations et le guide publiés. Dans les réglages du dépôt, Pages doit déployer depuis GitHub Actions.

## Releases

Pousser un tag de version lance les tests, puis publie une release GitHub, avec des notes générées depuis les commits et le site construit, guide compris, joint en `react-slides-<version>.zip` :

```bash
git tag v1.0.0
git push origin v1.0.0
```

Le site de l'archive utilise des adresses relatives : il se copie sur n'importe quel serveur web, à la racine d'un domaine ou dans un dossier.

## Docker

Pour faire tourner le site sur un serveur avec Docker, les ports 80 et 443 ouverts et un enregistrement DNS qui pointe le domaine vers lui :

```bash
cp docker/.env.example docker/.env                        # puis le remplir
docker compose -f docker/compose.prod.yml up -d --build   # démarrer, ou mettre à jour après un git pull
docker compose -f docker/compose.prod.yml logs -f         # suivre les journaux
docker compose -f docker/compose.prod.yml down            # arrêter
```

| Réglage de `docker/.env` | Rôle |
| --- | --- |
| `DOMAIN` | Domaine sur lequel le site est servi |
| `ACME_EMAIL` | Adresse à laquelle Let's Encrypt écrit au sujet du certificat |
| `DOCKER_GID` | Groupe propriétaire du socket Docker, donné par `stat -c %g /var/run/docker.sock` |
| `DEV_PORT` | Port du serveur de développement, 5173 par défaut |

La pile fait tourner trois conteneurs, tirés des Docker Hardened Images :

- `app` sert le site et ce guide avec nginx. Les fichiers hachés sont gardés en cache un an et les pages sont toujours revérifiées : une nouvelle version s'affiche à la visite suivante.
- `traefik` obtient et renouvelle le certificat Let's Encrypt, redirige le HTTP vers le HTTPS, sert le HTTP/2 et le HTTP/3, compresse les réponses et ajoute les en-têtes de sécurité. Sa politique de sécurité du contenu ne laisse entrer de l'extérieur que les lecteurs YouTube et Vimeo et les images YouTube.
- `socket-proxy` ne donne à Traefik que la lecture de la liste des conteneurs, au lieu de tout le socket Docker.

Les trois tournent avec un utilisateur sans privilèges, sur un système de fichiers en lecture seule, sans aucune capacité Linux, avec des limites de mémoire et des journaux en rotation.
