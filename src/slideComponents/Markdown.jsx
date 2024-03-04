import React from 'react';
import ReactMarkdown from 'react-markdown';
import remarkGfm from 'remark-gfm';
import rehypeRaw from 'rehype-raw';
import { textSize, listType, textAlign } from './theme.js';
import Paragraph from './Paragraph.jsx';
import Heading from './Heading.jsx';
import Link from './Link.jsx';
import Code from './Code.jsx';

function isCheckbox(children) {
    if (React.isValidElement(children)) {
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

function Markdown({ children }) {
    const components = {
        p: ({ children }) => <Paragraph fontSize={5}>{children}</Paragraph>,
        h1: ({ children }) => <Heading fontSize={8}>{children}</Heading>,
        h2: ({ children }) => <Heading fontSize={7}>{children}</Heading>,
        h3: ({ children }) => <Heading fontSize={6}>{children}</Heading>,
        h4: ({ children }) => <Heading fontSize={5}>{children}</Heading>,
        h5: ({ children }) => <Heading fontSize={4}>{children}</Heading>,
        h6: ({ children }) => <Heading fontSize={3}>{children}</Heading>,
        ul: ({ children }) => <ul className={`list-inside ${listType.bulleted} ${textSize[5]} text-black bg-transparent text-left`}>{children}</ul>,
        ol: ({ children }) => <ol className={`list-inside ${listType.numbered} ${textSize[5]} text-black bg-transparent text-left`}>{children}</ol>,
        li: ({ children }) => <li key={Math.random()} className={isCheckbox(children)?"list-none":""}>{children}</li>,
        blockquote: ({ children }) => <blockquote className={"border-l-4 border-gray-500 pl-4 italic my-4"}>{children}</blockquote>,
        code: ({ children, className }) => <Code language={!className?"":(/language-(\w+)/.exec(className||""))[1]} fontSize={4}>{children}</Code>,
        a: ({ children, href }) => <Link href={href} fontSize={5}>{children}</Link>,
        table: ({ children }) => <table className={`min-w-full divide-y divide-gray-200 ${textSize[5]} ${textAlign["center"]}`}>{children}</table>,
        thead: ({ children }) => <thead className="divide-y divide-gray-200">{children}</thead>,
        tbody: ({ children }) => <tbody className="divide-y divide-gray-200">{children}</tbody>,
        th: ({ children }) => <th className="px-4 py-2"><b>{children}</b></th>,
        td: ({ children }) => <td className="px-4 py-2">{children}</td>
    };

    return (
        <ReactMarkdown components={components} remarkPlugins={[remarkGfm]} rehypePlugins={[rehypeRaw]}>
            {children}
        </ReactMarkdown>
    );
}

export default Markdown;