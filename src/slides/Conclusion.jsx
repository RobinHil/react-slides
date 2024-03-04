import { CenterLayout, Markdown } from '../slideComponents/index.jsx';

function Conclusion() {
    return (
        <CenterLayout>
            <Markdown>{
`## C'est la fin.

<br/>

![Image alt text](/favicon.svg)

<br/>

*Eh oui, c'est une image en Markdown :)*`
            }</Markdown>
        </CenterLayout>
    );
}

export default Conclusion;