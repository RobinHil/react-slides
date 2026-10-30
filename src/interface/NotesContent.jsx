import { lazy, Suspense } from 'react';
import ReactMarkdown from 'react-markdown';
import remarkGfm from 'remark-gfm';
import remarkMath from 'remark-math';
import { useSlides } from '../contexts/Slides.context.jsx';
import { SlideThemeContext } from '../contexts/SlideTheme.context.jsx';
import { useLabels, useMediaQuery } from './hooks.js';
import dedent from '../components/dedent.js';

const STRONG_TEXT = "text-gray-900 dark:text-gray-100";
const CODE_BACKGROUND = "rounded-sm bg-gray-100 dark:bg-gray-800";
const CELL_BORDER = "border-b border-gray-200 dark:border-gray-700";

const Diagram = lazy(() => import('../components/Diagram.jsx'));
const Formula = lazy(() => import('../components/Formula.jsx'));

/** Formula inside a sentence of the notes, its source shown while the formula engine loads. */
function InlineFormula({ children }) {
    return (
        <Suspense fallback={<code className="font-mono text-[0.85em]">{children}</code>}>
            <Formula>{children}</Formula>
        </Suspense>
    );
}

/** Block of the notes, a formula, a diagram, or code shown as it is. */
function NotesBlock({ children, className }) {
    const source = children.props.children;
    const pre = <pre className={`${CODE_BACKGROUND} my-3 p-3 overflow-x-auto text-xs leading-relaxed [&>code]:bg-transparent [&>code]:p-0`}>{children}</pre>;
    if (className.includes("math-display"))
        return <Suspense fallback={pre}><Formula display>{source}</Formula></Suspense>;
    if (className.includes("language-mermaid"))
        return <div className="my-3"><Suspense fallback={pre}><Diagram fontSize="1em">{source}</Diagram></Suspense></div>;
    return pre;
}

const components = {
    h1: ({ children }) => <h1 className={`mt-5 mb-2 first:mt-0 text-lg font-bold ${STRONG_TEXT}`}>{children}</h1>,
    h2: ({ children }) => <h2 className={`mt-5 mb-2 first:mt-0 text-base font-bold ${STRONG_TEXT}`}>{children}</h2>,
    h3: ({ children }) => <h3 className={`mt-4 mb-1.5 first:mt-0 text-sm font-semibold ${STRONG_TEXT}`}>{children}</h3>,
    h4: ({ children }) => <h4 className="mt-4 mb-1.5 first:mt-0 text-xs font-semibold uppercase tracking-wide text-gray-500 dark:text-gray-400">{children}</h4>,
    h5: ({ children }) => <h5 className="mt-4 mb-1.5 first:mt-0 text-xs font-semibold uppercase tracking-wide text-gray-500 dark:text-gray-400">{children}</h5>,
    h6: ({ children }) => <h6 className="mt-4 mb-1.5 first:mt-0 text-xs font-semibold uppercase tracking-wide text-gray-500 dark:text-gray-400">{children}</h6>,
    p: ({ children }) => <p className="my-2 first:mt-0 last:mb-0">{children}</p>,
    strong: ({ children }) => <strong className={`font-semibold ${STRONG_TEXT}`}>{children}</strong>,
    ul: ({ children, className }) => <ul className={`my-2 space-y-1 ${className?.includes("contains-task-list")?"":"list-disc pl-5 marker:text-gray-400"}`}>{children}</ul>,
    ol: ({ children }) => <ol className="my-2 space-y-1 list-decimal pl-6 marker:text-gray-400">{children}</ol>,
    li: ({ children, className }) => <li className={`[&>ul]:my-1 [&>ol]:my-1 ${className?.includes("task-list-item")?"pl-5.5 -indent-5.5":"pl-0.5"}`}>{children}</li>,
    input: ({ checked }) => <input type="checkbox" checked={checked} disabled className="m-0 mr-2 w-3.5 h-3.5 align-[-0.15em] indent-0" />,
    blockquote: ({ children }) => <blockquote className="my-3 border-l-4 border-accent pl-3 italic text-gray-500 dark:text-gray-400">{children}</blockquote>,
    code: ({ children, className }) => className?.includes("math-inline") ? <InlineFormula>{children}</InlineFormula> : <code className={`${CODE_BACKGROUND} px-1 py-0.5 font-mono text-[0.85em]`}>{children}</code>,
    pre: ({ children }) => <NotesBlock className={children.props.className ?? ""}>{children}</NotesBlock>,
    a: ({ children, href }) => <a href={href} target="_blank" rel="noreferrer" className="text-accent hover:underline">{children}</a>,
    hr: () => <hr className="my-4 border-gray-200 dark:border-gray-700" />,
    table: ({ children }) => <div className="my-3 overflow-x-auto"><table className="w-full text-left text-xs">{children}</table></div>,
    th: ({ children }) => <th className={`${CELL_BORDER} py-1.5 pr-3 font-semibold ${STRONG_TEXT}`}>{children}</th>,
    td: ({ children }) => <td className={`${CELL_BORDER} py-1.5 pr-3`}>{children}</td>
};

/** Markdown notes of a slide, in the language of the deck and the theme of the interface, or a word saying there are none. */
function NotesContent({ notes }) {
    const { lang } = useSlides();
    const isDark = useMediaQuery("(prefers-color-scheme: dark)");
    const text = useLabels();

    if (!notes)
        return <p className="text-gray-500 dark:text-gray-400 italic">{text.noNotes}</p>;

    return (
        <div lang={lang}>
            <SlideThemeContext value={{ codeTheme: isDark ? "dark" : "light", diagramTheme: isDark ? "dark" : "light" }}>
                <ReactMarkdown remarkPlugins={[remarkGfm, remarkMath]} components={components} disallowedElements={["img"]} skipHtml>
                    {dedent(notes)}
                </ReactMarkdown>
            </SlideThemeContext>
        </div>
    );
}

export { STRONG_TEXT };
export default NotesContent;
