import { Formula, Link, Text } from '../../../components/index.jsx';

const items = ["Premier élément", "Deuxième élément", "Troisième élément", "Quatrième élément", "Cinquième élément", "Sixième élément", "..."];

const text = {
    corners: {
        chapter: "Chapitre 3 · Mise en page",
        slideOf: (number, total) => `Diapositive ${number} sur ${total}`
    },
    notes: {
        title: `
            ## Accroche

            - Se présenter en **une phrase**
            - Annoncer la durée : *20 minutes* environ
            - Demander qui a déjà écrit du React

            > Ne pas lire la diapo, elle parle d'elle-même.
        `,
        summary: `
            ## Le plan

            Parcourir le sommaire **sans s'attarder**, chaque partie a sa diapo.

            1. Les textes et les couleurs : la base
            2. Les mises en page : en-têtes, images, listes, tableaux
            3. Le code et le Markdown pour finir

            ---

            Temps prévu par partie :

            | Partie | Durée |
            | --- | --- |
            | Textes et couleurs | 6 min |
            | Mises en page | 8 min |
            | Code et Markdown | 6 min |
        `,
        lists: `
            ## Points à montrer

            - [x] Une liste se construit à partir d'un **simple tableau**
            - [x] Puces avec \`type="bulleted"\`, numéros avec \`type="numbered"\`
            - [ ] Montrer l'alignement à droite et au centre
            - [ ] Rappeler que les puces restent alignées

            ### Exemple à dire à l'oral

            \`\`\`jsx
            <List type="numbered" list={["Un", "Deux"]} />
            \`\`\`

            Plus de détails dans la [documentation de React](https://react.dev).
        `,
        formulas: `
            Les notes comprennent aussi les formules, comme $\\Delta = b^2 - 4ac$, et les diagrammes :

            \`\`\`mermaid
            flowchart LR
                Notes --> Formules
                Notes --> Diagrammes
            \`\`\`
        `,
        steps: `
            Avancer à la flèche : les trois cartes arrivent une par une, puis le code avec la dernière.
        `
    },
    title: {
        subtitle: "Une bibliothèque de composants React",
        description: <>
            Créez vos supports de présentation à partir de composants React<br />
            personnalisables, et accédez ainsi à vos médias en toutes circonstances<br />
            à partir d'une simple connexion internet et d'un navigateur web.
        </>,
        author: "Par Robin HILAIRE"
    },
    summary: {
        title: "Sommaire",
        parts: ["Textes", "Liens", "Couleurs", "Fonds", "Palette et dégradés", "Polices", "Thèmes", "En-têtes et pieds de page", "Images", "Listes", "Tableaux", "Code", "Markdown", "Diagrammes", "Formules", "Vidéos", "Apparition progressive"]
    },
    textTypes: {
        title: "Textes",
        heading: <>
            Le premier type de texte simple est le composant Heading, il sert à afficher des titres.
            Sa particularité est que les textes sont en gras, et que sa taille par défaut est plus grande
            que pour les autres composants.<br />
            Les tailles sont celles de Tailwind, de xs à 9xl :
        </>,
        paragraph: <>
            Le second type de texte simple est le composant Paragraph. Il sert à afficher des textes simples.<br />
            Il accepte les mêmes tailles :
        </>
    },
    textFormatting: {
        title: "Textes",
        subtitle: "Mise en forme des textes",
        intro: <>Les props underline, strike, italic et bold s'appliquent à tous les textes, et le composant Text met en forme <Text bold color={["sky-500", "violet-600"]}>un seul morceau</Text> d'une phrase.</>,
        underline: "Souligné",
        strike: "Barré",
        italic: "Italique",
        bold: "Gras"
    },
    links: {
        title: "Liens",
        intro: <>
            Il est possible d'ajouter des liens hypertextes directement intégrés<br />
            à la présentation de manière très simple grâce au composant Link.
        </>,
        example: <>Voici par exemple un <Link fontSize="3xl" href="https://google.fr">lien vers google.fr</Link>.</>
    },
    colors: {
        title: "Couleurs",
        text: "Texte",
        textIntro: <>Toute la palette Tailwind est utilisable<br />pour les textes, en voici une sélection.</>,
        background: "Fond",
        backgroundIntro: <>Toute la palette Tailwind est utilisable<br />pour les fonds, en voici une sélection.</>,
        footnote: "Ces couleurs sont applicables sur les textes, mais également sur les listes ainsi que sur les tableaux."
    },
    backgrounds: {
        title: "Fonds",
        intro: <>
            Chaque diapositive peut avoir sa propre couleur de fond, unie ou en dégradé, sur toute sa surface.<br />
            Il suffit d'une prop sur la diapositive, dans le deck :
        </>,
        gradient: "dégradé",
        footnote: "La miniature de la mosaïque et les bords de l'écran en plein écran suivent la couleur de la diapositive."
    },
    palette: {
        title: "Palette et dégradés",
        intro: <>
            26 teintes en 11 nuances, de 50 (très clair) à 950 (très foncé), utilisables partout : color="rose-600", bg="sky-50"...<br />
            Un tableau de couleurs donne un dégradé, sur les fonds comme sur les textes.
        </>,
        gradientText: "Texte en dégradé"
    },
    fonts: {
        title: "Polices",
        intro: <>
            Une police globale avec &lt;Presentation font="inter"&gt;, une police par diapositive avec &lt;Slide font="lora"&gt;,<br />
            ou ponctuellement sur un composant avec font="playfair-display". N'importe quelle police CSS est aussi acceptée.
        </>,
        sample: "Portez ce vieux whisky",
        sampleEnd: "au juge blond qui fume."
    },
    themes: {
        title: "Thèmes",
        intro: <>
            Un thème regroupe les polices, la couleur du texte, le fond, l'accent et le thème du code.<br />
            Il s'applique à tout le deck, ou à une seule diapositive, comme celle-ci en thème nuit.
        </>,
        previews: {
            light: ["Clair", "Le thème par défaut, sobre et lisible."],
            night: ["Nuit", "Un fond sombre, pour les salles peu éclairées."],
            paper: ["Papier", "Des titres en serif, sur un fond crème."]
        }
    },
    headersFooters: {
        title: "En-têtes et pieds de page",
        intro: <>
            Chacun des 4 coins accepte un texte, un objet {"{ text, font, color, fontSize }"}, une fonction ou un élément React,<br />
            et le raccourci pageNumber affiche la pagination dans n'importe quel coin.<br />
            Les coins globaux s'affichent sur toutes les diapositives, et chaque diapositive peut les remplacer ou les masquer.
        </>,
        code: `// Sur toutes les diapositives
<Presentation corners={{ topLeft: "React Slides", bottomRight: pageNumber }}>

// Sur une diapositive : remplacer un coin, en masquer un, ou tout masquer
<Slide corners={{ topRight: { text: "Annexe", color: "sky-600" }, bottomLeft: null }}>
<Slide corners={false}>`
    },
    images: {
        title: "Images",
        alt: "Logo de React Slides",
        simple: ["Simple", <>
            On peut créer une image simple, importée depuis le dossier src/assets.
            Par défaut, elle prend toute la place disponible, sans jamais déborder ni se déformer.
        </>],
        captioned: ["Légendée", <>
            On peut créer une image légendée.
            Elle sera alors incluse dans une figure.
            La légende est en italique et par défaut en petit texte.
        </>, "Voici une image légendée sous forme de figure."],
        size: ["Taille", <>
            On peut fixer la largeur d'une image grâce à la props "width", en fraction de la place disponible.
            Elle garde toujours ses proportions.<br />
            width="auto" l'affiche à sa taille d'origine, et "maxHeight" limite sa hauteur.
        </>, "Voici la même image avec width=\"1/2\"."],
        caption: ["Légende", <>
            On peut mettre en forme la légende d'une image en y plaçant un composant de texte.
            On doit pour cela remplacer le children en texte brut par un composant.
        </>, "Voici une légende gérée par un beau composant Heading."]
    },
    lists: {
        title: "Listes",
        example: "On obtient par exemple :",
        items,
        bullets: ["Puces", "On peut créer une liste à puces basique à partir d'un simple tableau de chaînes de caractères."],
        numbers: ["Numéros", "On peut créer une liste numérotée basique à partir d'un simple tableau de chaînes de caractères."],
        styles: ["Mises en forme", <>
            On peut mettre en forme une liste en fonction des styles qu'on y place.
            Il est donc possible de modifier le style des textes de la liste.
        </>],
        styled: ["Texte gras", "Texte souligné", "Texte italique", "Texte barré", "Fond bleu de liste", "Texte rouge de liste", "Texte plus petit", "..."],
        alignments: ["Alignements", "On peut aligner les listes de plusieurs manières :"],
        left: "À gauche (par défaut) :",
        right: "À droite :",
        center: "Au centre :"
    },
    tables: {
        title: "Tableaux",
        subjects: ["Mathématiques", "Français", "Histoire", "Sciences", "Anglais", "Physique", "Chimie", "Géographie", "Arts", "Sport"]
    },
    code: {
        title: "Code",
        dark: "Thème sombre",
        light: "Thème clair",
        sample: `#include <iostream>
using namespace std;

template <typename T>
T moyenne(T tableau[], int taille) {
    T somme = 0;
    for (int i = 0; i < taille; i++) {
        somme += tableau[i];
    }
    return somme / taille;
}

int main() {
    int tableauEntiers[] = {1, 2, 3, 4, 5};
    double tableauReels[] = {1.1, 2.2, 3.3, 4.4, 5.5};

    cout << "Moyenne des entiers : " << moyenne(tableauEntiers, 5) << endl;
    cout << "Moyenne des réels : " << moyenne(tableauReels, 5) << endl;

    return 0;
}`
    },
    markdown: {
        left: `# Titre 1
## Titre 2
### Titre 3
#### Titre 4
##### Titre 5
###### Titre 6

<br/>

**Texte Gras**

*Texte Italique*

~~Texte barré~~

Texte avec du \`code\` en ligne

Texte simple

<br/>

| Colonne 1 | Colonne 2 | Colonne 3 |
| --------- | --------- | --------- |
|  Ligne 1  | Valeur 1  | Valeur 2  |
|  Ligne 2  | Valeur 3  | Valeur 4  |`,
        right: `- [x] Tâche complétée
- [ ] Tâche non complétée

<br/>

> Voici une citation

<br/>

- Élément n°1 de liste à puce
- Élément n°2 de liste à puce

<br/>

1. Élément n°1 de liste numérotée
2. Élément n°2 de liste numérotée

<br/>

\`\`\`javascript
const exemple = (num) => {
    if (num > 0) {
        return "Positif";
    } else if (num < 0) {
        return "Négatif";
    } else {
        return "Zéro";
    }
};
\`\`\`

<br/>

[Lien vers google.fr](https://google.fr)`,
        footnote: <>
            Les styles du markdown sont fixes, le seul moyen de les modifier est d'aller directement dans le composant Markdown.<br />
            Les plugins remark-gfm ainsi que rehype-raw sont installés, ils permettent respectivement d'élargir les possibilités du markdown et d'y inclure des balises html.
        </>
    },
    diagrams: {
        title: "Diagrammes",
        intro: "Un diagramme s'écrit en texte, dans le langage Mermaid, et suit le thème et la police de la diapositive.",
        flowchart: ["Organigramme", `
            flowchart LR
                A[Idée] --> B{Assez claire ?}
                B -- Oui --> C[Diapositive]
                B -- Non --> D[Brouillon]
                D --> B
        `],
        sequence: ["Séquence", `
            sequenceDiagram
                Orateur->>Public: Pose une question
                Public-->>Orateur: Lève la main
                Orateur->>Public: Passe à la suite
        `]
    },
    formulas: {
        title: "Formules",
        component: ["Composant", <>Une formule s'écrit en LaTeX, dans une phrase comme <Formula>{"E = mc^2"}</Formula>, ou seule sur sa ligne avec display :</>],
        markdown: ["Markdown", String.raw`
Le Markdown les comprend aussi : $a^2 + b^2 = c^2$ dans le texte, et entre doubles dollars pour un bloc.

$$
\sum_{k=1}^{n} k = \frac{n(n+1)}{2}
$$
        `]
    },
    videos: {
        title: "Vidéos",
        file: ["Fichier", <>
            Une vidéo importée depuis src/assets. Avec autoPlay, elle démarre sans le son à l'arrivée sur la diapositive, et loop la fait tourner en boucle.
            Dans les vignettes et le PDF, elle est remplacée par sa première image.
        </>, "Une vidéo en lecture automatique et en boucle.", "Animation du logo de React Slides"],
        embed: ["YouTube et Vimeo", <>
            Il suffit de donner l'adresse de la vidéo. Le lecteur ne se charge qu'à l'affichage de la diapositive.
            Dans le PDF, sa miniature devient un lien vers la vidéo.
        </>, "Big Buck Bunny, de la Blender Foundation."]
    },
    steps: {
        title: "Apparition progressive",
        intro: <>
            Les éléments apparaissent un à un à la flèche suivante, et l'adresse retient l'étape : #diapositive.étape.<br />
            La prop order regroupe plusieurs éléments sur une même étape ou change leur ordre.
        </>,
        cards: [
            ["Une idée", "Chaque élément entouré de Step attend la flèche suivante pour apparaître."],
            ["Puis une autre", "Il garde sa place sur la diapositive : rien ne bouge quand il arrive."],
            ["Et la conclusion", "La flèche précédente revient en arrière, étape par étape."]
        ],
        code: `<Step>Apparaît en premier</Step>
<Step>Puis celui-ci</Step>
<Step order={1}>En même temps que le premier</Step>`
    },
    conclusion: {
        title: "C'est la fin.",
        alt: "Logo de React Slides",
        caption: "Eh oui, c'est une image en Markdown :)"
    }
};

export default text;
