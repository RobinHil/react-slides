import { CenterLayout, Heading, Markdown, TwoColumnLayout, Paragraph } from '../slideComponents/index.jsx';

function Markdown_area() {
    return (
        <CenterLayout>
            <Heading align="center" fontSize={8}>Markdown</Heading>
            <br /><br />
            <TwoColumnLayout
                leftContent={<CenterLayout>
                    <Markdown>{
`# Heading 1
## Heading 2
### Heading 3
#### Heading 4
##### Heading 5
###### Heading 6

<br/>

**Texte Gras**

*Texte Italique*

~~Texte barré~~

Texte simple`
                    }</Markdown>
                </CenterLayout>}

                rightContent={<CenterLayout>
                    <Markdown>{
`> Citation

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

[Lien vers google.fr](https://google.fr)

Table:

| Column 1 | Column 2 | Column 3 |
| -------- | -------- | -------- |
| Row 1    | Value 1  | Value 2  |
| Row 2    | Value 3  | Value 4  |

Task list:

- [x] Completed task
- [ ] Incomplete task`
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