import { isValidElement, lazy } from 'react';
import ReactMarkdown, { defaultUrlTransform } from 'react-markdown';
import remarkGfm from 'remark-gfm';
import remarkMath from 'remark-math';
import rehypeRaw from 'rehype-raw';
import { listType, fontStyle } from './styles.js';
import Paragraph from './Paragraph.jsx';
import Heading from './Heading.jsx';
import Link from './Link.jsx';
import Code from './Code.jsx';

const Diagram = lazy(() => import('./Diagram.jsx'));
const Formula = lazy(() => import('./Formula.jsx'));

/** Tells whether rendered Markdown children hold a task list checkbox. */
function isCheckbox(children) {
    if (isValidElement(children)) {
        const { type, props } = children;
        if (type==="input"&&props.type==="checkbox")
            return true;
        if (props.children)
            return isCheckbox(props.children);
    }

    if (Array.isArray(children))
        for (const child of children)
            if (isCheckbox(child))
                return true;

    return false;
}

/** Block of Markdown code, drawn as a formula for math, as a diagram for Mermaid, and highlighted otherwise. */
function CodeBlock({ children, className }) {
    if (className.includes("math-display"))
        return <Formula display>{children}</Formula>;
    const language = /language-(\S+)/.exec(className)?.[1];
    if (language==="mermaid")
        return <Diagram>{children}</Diagram>;
    return <Code language={language} fontSize="lg">{children}</Code>;
}

const components = {
    p: ({ children }) => <Paragraph fontSize="xl">{children}</Paragraph>,
    h1: ({ children }) => <Heading level={1} fontSize="8xl">{children}</Heading>,
    h2: ({ children }) => <Heading level={2} fontSize="7xl">{children}</Heading>,
    h3: ({ children }) => <Heading level={3} fontSize="6xl">{children}</Heading>,
    h4: ({ children }) => <Heading level={4} fontSize="5xl">{children}</Heading>,
    h5: ({ children }) => <Heading level={5} fontSize="4xl">{children}</Heading>,
    h6: ({ children }) => <Heading level={6} fontSize="3xl">{children}</Heading>,
    ul: ({ children, className }) => <ul className={`list-outside ${className?.includes("contains-task-list")?"":listType.bulleted} text-xl bg-transparent text-left`}>{children}</ul>,
    ol: ({ children }) => <ol className={`list-outside ${listType.numbered} text-xl bg-transparent text-left`}>{children}</ol>,
    li: ({ children }) => <li className={isCheckbox(children)?"list-none":""}>{children}</li>,
    blockquote: ({ children }) => <blockquote className="border-l-4 border-gray-500 pl-4 italic my-4">{children}</blockquote>,
    pre: ({ children }) => <CodeBlock className={children.props.className ?? ""}>{children.props.children}</CodeBlock>,
    code: ({ children, className }) => className?.includes("math-inline") ? <Formula>{children}</Formula> : <code className="rounded-sm bg-gray-100 px-1 py-0.5 font-mono text-[0.85em]">{children}</code>,
    a: ({ children, href }) => <Link href={href} fontSize="xl">{children}</Link>,
    img: ({ src, alt }) => <img src={src} alt={alt} className="inline-block h-auto max-w-full" />,
    table: ({ children }) => <table className="min-w-full divide-y divide-gray-200 text-xl text-center">{children}</table>,
    thead: ({ children }) => <thead className="divide-y divide-gray-200">{children}</thead>,
    tbody: ({ children }) => <tbody className="divide-y divide-gray-200">{children}</tbody>,
    th: ({ children }) => <th className="px-4 py-2"><b>{children}</b></th>,
    td: ({ children }) => <td className="px-4 py-2">{children}</td>
};

/** Keeps the safe links of Markdown, and lets images come inlined by the build. */
function transformUrl(url, key) {
    return key==="src" && url.startsWith("data:image/") ? url : defaultUrlTransform(url);
}

/** Renders Markdown, raw HTML, formulas and Mermaid diagrams included, with the components of the library. */
function Markdown({ children, font }) {
    const markdown = (
        <ReactMarkdown components={components} remarkPlugins={[remarkGfm, remarkMath]} rehypePlugins={[rehypeRaw]} urlTransform={transformUrl}>
            {children}
        </ReactMarkdown>
    );

    if (!font)
        return markdown;

    return (
        <div style={fontStyle(font)}>{markdown}</div>
    );
}

export default Markdown;
