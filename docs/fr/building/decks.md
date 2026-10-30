# Présentations

Chaque dossier de `src/decks` qui contient un `Deck.jsx` est une présentation, servie à l'adresse du nom de son dossier : `src/decks/my-talk` s'ouvre sur `/my-talk/`.

## Démarrer une présentation

Copiez `src/decks/starter` et renommez la copie. La nouvelle présentation apparaît sur la page d'accueil, a sa propre page, et son export PDF fonctionne de la même façon.

```text
src/decks/my-talk/
  Deck.jsx      les diapositives
  meta.js       titre et description, facultatif
  preview.png   image affichée quand l'adresse est partagée, facultative
  Intro.jsx     des diapositives dans leur propre fichier, autant que voulu
```

`Deck.jsx` exporte un composant qui renvoie une `<Presentation>`, avec une `<Slide>` par diapositive :

```jsx
import { Presentation, Slide } from '../../interface/index.jsx';
import { CenterLayout, Heading } from '../../components/index.jsx';
import Intro from './Intro.jsx';

/** My talk. */
function Deck() {
    return (
        <Presentation lang="fr">
            <Slide><Intro /></Slide>
            <Slide>
                <CenterLayout>
                    <Heading fontSize="8xl" align="center">Merci</Heading>
                </CenterLayout>
            </Slide>
        </Presentation>
    );
}

export default Deck;
```

## Titre et description

`meta.js` donne le titre de l'onglet du navigateur, de la carte de la page d'accueil et du lien partagé, et le texte qui l'accompagne :

```js
const meta = {
    title: "Mon exposé",
    description: "Le sujet de l'exposé, en une phrase."
};

export default meta;
```

Sans lui, le titre vient du nom du dossier : `my-talk` donne « My talk ».

## Aperçu de partage

`preview.png` est l'image que les réseaux sociaux et les messageries affichent pour l'adresse de la présentation. `pnpm screenshots` la produit, à partir d'une image de la première diapositive, pour toutes les présentations d'un coup (voir [Déploiement](deployment.md#captures-decran)) ; n'importe quelle image de 1200×675 pixels convient aussi.

## Langue

`lang` sur `<Presentation>` fixe la langue des diapositives et des notes, pour les lecteurs d'écran et la césure. L'interface autour des diapositives suit la langue du navigateur du visiteur.

Une présentation en plusieurs langues est une présentation par langue, qui partagent leurs diapositives. La démo procède ainsi : `src/decks/demo/DemoDeck.jsx` construit les diapositives à partir des textes qu'on lui donne, et `demo/Deck.jsx` et `demo-en/Deck.jsx` lui donnent les textes français et anglais de `demo/text/`.

## Ressources

Les images et les vidéos vivent dans `src/assets` et sont importées : le build vérifie qu'elles existent et les sert à la bonne adresse, où que le site soit hébergé :

```jsx
import photo from '../../assets/photo.jpg';
```
