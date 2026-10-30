import { CenterLayout, Code, Heading, Paragraph } from '../../components/index.jsx';

/** Slide presenting headers and footers in the corners of the slides. */
function HeadersFooters({ text }) {
    return (
        <CenterLayout>
            <Heading fontSize="8xl" align="center">{text.title}</Heading>
            <br />
            <Paragraph fontSize="2xl" align="center" color="slate-600">{text.intro}</Paragraph>
            <br /><br />
            <Code language="jsx" theme="light" fontSize="2xl" align="center">{text.code}</Code>
        </CenterLayout>
    );
}

export default HeadersFooters;
