import { Prism } from 'react-syntax-highlighter';
import { vscDarkPlus, vs } from 'react-syntax-highlighter/dist/esm/styles/prism';

function Code({ children, language="", theme="" }) {
    return (
        <Prism language={language} style={theme==="light"?vs:vscDarkPlus} className="rounded-md">
            {children}
        </Prism>
    );
};

export default Code;
