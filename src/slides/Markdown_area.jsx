import { CenterLayout, Heading, Markdown, TwoColumnLayout, Paragraph } from '../slideComponents/index.jsx';

function Markdown_area() {
    return (
        <CenterLayout>
            <Heading align="center" fontSize={8}>Markdown</Heading>
            <br /><br />
            <TwoColumnLayout
                leftContent={<CenterLayout>
                    <Markdown>{
`# Titre 1
## Titre 2
### Titre 3
#### Titre 4
##### Titre 5
###### Titre 6

<br/>

**Texte Gras**

*Texte Italique*

~~Texte barré~~

Texte simple

<br/>

| Colonne 1 | Colonne 2 | Colonne 3 |
| --------- | --------- | --------- |
|  Ligne 1  | Valeur 1  | Valeur 2  |
|  Ligne 2  | Valeur 3  | Valeur 4  |`
                    }</Markdown>
                </CenterLayout>}

                rightContent={<CenterLayout>
                    <Markdown>{
`- [x] Tâche complétée
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

[Lien vers google.fr](https://google.fr)`
                    }</Markdown>
                </CenterLayout>}
            />
            <br />
            <Paragraph fontSize={6} align="center">
                <i>
                    Les styles du markdown sont fixes, le seul moyen de les modifier est d'aller directement dans le composant Markdown.<br />
                    Les plugins remark-gfm ainsi que rehype-raw sont installés, ils permettent respectivement d'élargir les possibilités du markdown et d'y inclure des balises html.
                </i>
            </Paragraph>
        </CenterLayout>
    );
}

export default Markdown_area;