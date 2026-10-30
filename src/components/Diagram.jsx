import { use, useId } from 'react';
import mermaid from 'mermaid';
import { flexPosition, fontSizeStyle, fontStyle } from './styles.js';
import dedent from './dedent.js';
import { useSlideTheme } from '../contexts/SlideTheme.context.jsx';

const MERMAID_THEMES = { light: "neutral", dark: "dark" };
const BASE_FONT_SIZE = 16;
const diagrams = new Map();
let queue = Promise.resolve();
let renders = 0;
let sandbox = null;

/** Turns a font of the theme or a CSS font family into the family Mermaid measures its text with, that of the page when none is given. */
function fontFamily(font) {
    const value = fontStyle(font).fontFamily;
    const variable = /^var\((--[\w-]+)/.exec(value ?? "")?.[1];
    return (variable && getComputedStyle(document.documentElement).getPropertyValue(variable).trim()) || value || getComputedStyle(document.body).fontFamily;
}

/** Reads the width a diagram is drawn at, and lets it fill the box sized from it instead. */
function scalable(svg) {
    let width = null;
    const fluid = svg.replace(/^(<svg[^>]*?)\swidth="100%"([^>]*?)\sstyle="max-width: ([\d.]+)px;"/, (_, start, middle, drawn) => {
        width = Number(drawn);
        return `${start}${middle} style="display: block; width: 100%; height: auto;"`;
    });
    return { svg: fluid, width };
}

/** Gives the hidden element Mermaid lays diagrams out in, out of the flow of the page so it never makes it scroll. */
function layoutSandbox() {
    if (!sandbox?.isConnected) {
        sandbox = document.createElement("div");
        sandbox.className = "fixed top-0 left-0 -translate-x-[200%] invisible pointer-events-none";
        sandbox.setAttribute("aria-hidden", "true");
        document.body.append(sandbox);
    }
    return sandbox;
}

/** Draws a Mermaid diagram once the font is loaded, one diagram at a time since Mermaid keeps a single setup. */
function draw(code, theme, family) {
    const job = queue.then(async () => {
        await document.fonts.load(`${BASE_FONT_SIZE}px ${family}`);
        mermaid.initialize({ startOnLoad: false, securityLevel: "strict", suppressErrorRendering: true, theme, fontFamily: family, themeVariables: { fontFamily: family, fontSize: `${BASE_FONT_SIZE}px` } });
        const id = `mermaid${++renders}x`;
        const { svg } = await mermaid.render(id, code, layoutSandbox());
        return { id, ...scalable(svg) };
    });
    queue = job.catch(() => null);
    return job;
}

/** Draws a diagram once, and gives back the same promise to every later render. */
function diagram(code, theme, family) {
    const key = `${theme}\n${family}\n${code}`;
    if (!diagrams.has(key))
        diagrams.set(key, draw(code, theme, family));
    return diagrams.get(key);
}

/** Diagram written in the Mermaid language, in a light or dark theme, that of the slide by default, with the font of the slide, its text at the font size given and never wider than its room. */
function Diagram({ children, theme, fontSize="2xl", align="center", font }) {
    const settings = useSlideTheme();
    const instance = `diagram${useId().replace(/\W/g, "")}`;
    const name = theme ?? settings.diagramTheme;
    const { id, svg, width } = use(diagram(dedent(String(children)), MERMAID_THEMES[name] ?? name, fontFamily(font ?? settings.font)));

    return (
        <div className="flex flex-col" style={{ alignItems: flexPosition(align), ...fontSizeStyle(fontSize), lineHeight: "normal" }}>
            <div className="max-w-full" style={{ width: width && `${width/BASE_FONT_SIZE}em` }} dangerouslySetInnerHTML={{ __html: svg.replaceAll(id, instance) }} />
        </div>
    );
}

export default Diagram;
