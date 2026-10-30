import { Fragment, use } from 'react';
import { jsx, jsxs } from 'react/jsx-runtime';
import { toJsxRuntime } from 'hast-util-to-jsx-runtime';
import { createHighlighterCore } from 'shiki/core';
import { createJavaScriptRegexEngine } from 'shiki/engine/javascript';
import { bundledLanguages } from 'shiki/langs';
import darkPlus from 'shiki/themes/dark-plus.mjs';
import lightPlus from 'shiki/themes/light-plus.mjs';
import { fontSizeStyle, fontStyle, flexPosition } from './styles.js';
import { useSlideTheme } from '../contexts/SlideTheme.context.jsx';

const highlighter = createHighlighterCore({ themes: [darkPlus, lightPlus], engine: createJavaScriptRegexEngine({ forgiving: true, target: "ES2018" }) });
const snippets = new Map();

/** Loads the grammar of a language and turns a snippet into React elements. */
async function highlight(code, language, light) {
    const shiki = await highlighter;
    const loaded = Object.hasOwn(bundledLanguages, language) && await shiki.loadLanguage(bundledLanguages[language]).then(() => true, () => false);
    const tree = shiki.codeToHast(code, { lang: loaded?language:"text", theme: light?"light-plus":"dark-plus" });

    return toJsxRuntime(tree, { Fragment, jsx, jsxs, components: {
        pre: ({ style, children }) => <pre className={`rounded-md p-[0.5em] [font:inherit] ${light?"border-2 border-gray-200":""}`} style={style}>{children}</pre>,
        code: ({ children }) => <code className="[font:inherit]">{children}</code>
    } });
}

/** Highlights a snippet once, and gives back the same promise to every later render. */
function snippet(code, language, light) {
    const key = `${light}\n${language}\n${code}`;
    if (!snippets.has(key))
        snippets.set(key, highlight(code, language, light));
    return snippets.get(key);
}

/** Block of syntax highlighted code, in a dark or light theme, that of the slide by default. */
function Code({ children, language="", theme, fontSize="lg", align="left", font }) {
    const { codeTheme } = useSlideTheme();
    const code = use(snippet(String(children), language, (theme ?? codeTheme)==="light"));

    return (
        <div className="flex flex-col" style={{ alignItems: align==="left" ? undefined : flexPosition(align), ...fontSizeStyle(fontSize), ...fontStyle(font || "mono") }}>
            {code}
        </div>
    );
}

export default Code;
