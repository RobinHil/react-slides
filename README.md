_Robin HILAIRE, BUT 2ème année à l'IUT d'Arles_

# React Slides

A react slides library to build your presentation medias.

# Déploiement

Afin de déployer l'outil, il faut d'abord vérifier que l'on a bien installé Node.js avec npm en version 18 au minimum.

Il est ensuite nécessaire de se placer dans le répertoire du projet afin de procéder à l'installation des bibliothèques indispensables au projet :
```sh
npm install
```

On peut ensuite lancer le projet avec la commande de développement pour une exécution locale :
```sh
npm run dev
```

On peut également déployer directement sur un serveur notre projet. Il suffit pour cela d'exécuter la commande de construction du projet puis de déplacer le contenu du dossier ```dist/``` produit vers le répertoire distant dédié à l'application sur notre serveur.
Par exemple :
```sh
npm run build
rsync -r dist/* /var/www/nom_du_site/
```

Si on désire modifier les diapositives, il faut modifier les fichiers contenus dans le dossier ```/src/slides/``` du projet.

Chaque slide est représentée par un composant indépendant. Ces composants doivent ABSOLUMENT être importés dans le fichier ```/src/slides/index.jsx```, puis être ajoutés dans la liste ```slides``` présente dans le fichier comme suit :

```jsx
// ...
import Diapositive from './Diapositive.jsx';

const slides = [
    Diapositive,
    // ...
];

export default slides;
```

Cet exemple permet que la diapositive contenue dans le composant ```Diapositive``` soit prise en compte dans la présentation.

Pour finir, les composants utiles pour la construction des diapositives sont importables depuis le fichier ```/src/slideComponents/index.jsx``` :
```jsx
// Liste de tous les composants importables
import {CenterLayout, Code, Heading, Image, Link, List, Markdown, Paragraph, Table, TwoColumnLayout} from '../slideComponents/index.jsx';
```