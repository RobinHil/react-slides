import SyntaxHighlighter from 'react-syntax-highlighter/dist/esm/light';
import { vs, vs2015 } from 'react-syntax-highlighter/dist/esm/styles/hljs';
import { textSize } from './theme.js';

// L'import racine de react-syntax-highlighter embarque highlight.js avec ses
// ~200 langages, soit l'essentiel du méga-octet du bundle. La variante `light`
// n'embarque que le moteur : chaque langage doit être enregistré à la main.
//
// Pour en ajouter un : importez-le depuis
// react-syntax-highlighter/dist/esm/languages/hljs/<nom> et ajoutez-le à la
// liste ci-dessous. Un langage non enregistré n'échoue pas, il s'affiche
// simplement sans coloration.
import bash from 'react-syntax-highlighter/dist/esm/languages/hljs/bash';
import cpp from 'react-syntax-highlighter/dist/esm/languages/hljs/cpp';
import css from 'react-syntax-highlighter/dist/esm/languages/hljs/css';
import javascript from 'react-syntax-highlighter/dist/esm/languages/hljs/javascript';
import json from 'react-syntax-highlighter/dist/esm/languages/hljs/json';
import markdown from 'react-syntax-highlighter/dist/esm/languages/hljs/markdown';
import python from 'react-syntax-highlighter/dist/esm/languages/hljs/python';
import typescript from 'react-syntax-highlighter/dist/esm/languages/hljs/typescript';
import xml from 'react-syntax-highlighter/dist/esm/languages/hljs/xml';

const LANGAGES = { bash, cpp, css, javascript, json, markdown, python, typescript, xml };
for (const [nom, definition] of Object.entries(LANGAGES)) {
    SyntaxHighlighter.registerLanguage(nom, definition);
}
// Alias courants dans les blocs Markdown.
SyntaxHighlighter.registerLanguage('js', javascript);
SyntaxHighlighter.registerLanguage('ts', typescript);
SyntaxHighlighter.registerLanguage('html', xml);
SyntaxHighlighter.registerLanguage('sh', bash);
SyntaxHighlighter.registerLanguage('c++', cpp);

function Code({ children, language="", theme="", fontSize=4 }) {
    const combinedStyle = `rounded-md ${textSize[fontSize]} ${theme==="light"?"border-2 border-gray-200":"border-none"}`

    return (
        <SyntaxHighlighter language={language} style={theme==="light"?vs:vs2015} className={combinedStyle}>
            {children}
        </SyntaxHighlighter>
    );
};

export default Code;
