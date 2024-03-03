import ReactMarkdown from 'react-markdown';
import Paragraph from './Paragraph.jsx';
import Heading from './Heading.jsx';
import Link from './Link.jsx';
import Code from './Code.jsx';

function Markdown({ children }) {
    const components = {
        p: ({ children }) => <Paragraph>{children}</Paragraph>,
        h1: ({ children }) => <Heading fontSize={9}>{children}</Heading>,
        h2: ({ children }) => <Heading fontSize={8}>{children}</Heading>,
        h3: ({ children }) => <Heading fontSize={7}>{children}</Heading>,
        h4: ({ children }) => <Heading fontSize={6}>{children}</Heading>,
        h5: ({ children }) => <Heading fontSize={5}>{children}</Heading>,
        h6: ({ children }) => <Heading fontSize={4}>{children}</Heading>,
        ul: ({ children }) => <ul className={"list-inside list-disc text-sm text-black bg-transparent text-left"}>{children}</ul>,
        ol: ({ children }) => <ol className={"list-inside list-decimal text-sm text-black bg-transparent text-left"}>{children}</ol>,
        li: ({ children }) => <li key={children}>{children}</li>,
        blockquote: ({ children }) => <blockquote className={"border-l-4 border-gray-500 pl-4 italic my-4"}>{children}</blockquote>,
        code: ({ children, className }) => <Code language={(/language-(\w+)/.exec(className || ''))[1]}>{children}</Code>,
        a: ({ children, href }) => <Link href={href}>{children}</Link>
    };

    return (
        <ReactMarkdown components={components}>
            {children}
        </ReactMarkdown>
    );
}

export default Markdown;