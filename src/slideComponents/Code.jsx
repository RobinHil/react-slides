import SyntaxHighlighter from 'react-syntax-highlighter';
import { vs, vs2015 } from 'react-syntax-highlighter/dist/esm/styles/hljs';
import { textSize } from './theme.js';

function Code({ children, language="", theme="", fontSize=4 }) {
    const combinedStyle = `rounded-md ${textSize[fontSize]} ${theme==="light"?"border-2 border-gray-200":"border-none"}`

    return (
        <SyntaxHighlighter language={language} style={theme==="light"?vs:vs2015} className={combinedStyle}>
            {children}
        </SyntaxHighlighter>
    );
};

export default Code;