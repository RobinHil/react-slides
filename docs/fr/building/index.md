# Construire ses présentations

Une présentation, ou deck, est un composant React écrit dans `src/decks`. Ses diapositives se composent des composants de la bibliothèque, et rien d'autre dans le projet n'a besoin de changer : la page d'accueil, la page de la présentation, son aperçu de partage et son export PDF suivent d'eux-mêmes.

## Travailler sur une présentation

Le plus simple est le conteneur de développement, avec rechargement à chaud sur <http://localhost:5173> et ce guide sur <http://localhost:5173/docs/fr/> :

```bash
docker compose -f docker/compose.dev.yml up --watch
```

Les images viennent des Docker Hardened Images : connectez-vous une fois avec `docker login dhi.io`, avec un compte Docker gratuit.

Sans Docker, installez Node.js (version dans `.nvmrc`) et pnpm (version dans `package.json`), puis :

```bash
pnpm install
pnpm dev     # http://localhost:5173
pnpm lint    # vérifier le code
pnpm build   # site statique dans dist/
```

## Dans cette partie

| Page | Contenu |
| --- | --- |
| [Présentations](decks.md) | Créer une présentation : son dossier, son titre, sa description et son aperçu |
| [Diapositives](slides.md) | `<Presentation>` et `<Slide>`, et l'ajustement des diapositives à l'écran |
| [Couleurs, polices et thèmes](themes.md) | Fonds, palette de couleurs, dégradés, polices et thèmes |
| [Textes](text.md) | `Text`, `Heading`, `Paragraph`, `Link`, `List`, `Table` |
| [Mises en page](layouts.md) | `CenterLayout`, `TwoColumnLayout`, `GridLayout`, `RowLayout`, `Card`, `ColorSwatch` |
| [Images et vidéos](media.md) | `Image`, `Video` |
| [Code et Markdown](code-and-markdown.md) | `Code`, `Markdown` |
| [Diagrammes et formules](diagrams-and-formulas.md) | `Diagram`, `Formula` |
| [Étapes et transitions](steps-and-transitions.md) | `Step`, transitions entre diapositives |
| [En-têtes, pieds de page et notes](corners-and-notes.md) | Coins des diapositives, notes de l'orateur |
| [Déploiement](deployment.md) | GitHub Pages, releases, Docker |

La présentation de démo, dans `src/decks/demo`, utilise tous les composants ; chaque page montre la diapositive qui le présente.
