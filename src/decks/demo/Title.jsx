import { CenterLayout, Heading, Paragraph } from '../../components/index.jsx';

/** Title slide of the presentation. */
function Title({ text }) {
    return (
        <CenterLayout>
            <Heading align="center" fontSize="9xl" color="red-700">React Slides</Heading>
            <br />
            <br />
            <br />
            <Heading level={2} fontSize="5xl" italic={true} color="blue-500" align="center">{text.subtitle}</Heading>
            <br />
            <Paragraph fontSize="2xl" align="center">{text.description}</Paragraph>
            <br /><br />
            <br /><br />
            <Paragraph fontSize="xl" align="center" italic={true}>{text.author}</Paragraph>
        </CenterLayout>
    );
}

export default Title;
