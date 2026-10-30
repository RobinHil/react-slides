import { useMemo } from 'react';
import katex from 'katex';
import 'katex/dist/katex.min.css';
import { flexPosition, fontSizeStyle, textStyle } from './styles.js';

/** Mathematical formula written in LaTeX, inside a sentence, or on its own line with display. */
function Formula({ children, display=false, fontSize, color, align="center" }) {
    const html = useMemo(() => katex.renderToString(String(children), { displayMode: display, throwOnError: false, output: "htmlAndMathml" }), [children, display]);
    const style = { ...fontSizeStyle(fontSize), ...textStyle(color) };

    if (!display)
        return <span style={style} dangerouslySetInnerHTML={{ __html: html }} />;

    return (
        <div className="flex [&>.katex-display]:my-[0.5em]" style={{ justifyContent: flexPosition(align), ...style }} dangerouslySetInnerHTML={{ __html: html }} />
    );
}

export default Formula;
