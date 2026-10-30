import { CenterLayout, Heading, Paragraph } from '../../components/index.jsx';

/** Slide presenting hyperlinks. */
function Links({ text }) {
    return (
        <CenterLayout>
            <Heading align="center" fontSize="8xl">{text.title}</Heading>
            <br /><br />
            <br /><br />
            <Paragraph fontSize="3xl" align="center">{text.intro}</Paragraph>
            <br />
            <br />
            <Paragraph fontSize="3xl" align="center">{text.example}</Paragraph>
        </CenterLayout>
    );
}

export default Links;
