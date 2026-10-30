import { TwoColumnLayout, Heading, Paragraph, CenterLayout } from '../../components/index.jsx';

/** Slide presenting the sizes of headings and paragraphs. */
function TextTypes({ text }) {
    return (
        <CenterLayout>
            <Heading fontSize="8xl" align="center">{text.title}</Heading>
            <br />
            <TwoColumnLayout
                leftContent={<CenterLayout>
                    <Heading level={2} align="center">Heading</Heading>
                    <br />
                    <Paragraph fontSize="xl" align="justify">{text.heading}</Paragraph>
                    <Heading fontSize="xl" align="center">xl</Heading>
                    <Heading fontSize="2xl" align="center">2xl</Heading>
                    <Heading fontSize="3xl" align="center">3xl</Heading>
                    <Heading fontSize="4xl" align="center">4xl</Heading>
                    <Heading fontSize="5xl" align="center">5xl</Heading>
                    <Heading fontSize="6xl" align="center">6xl</Heading>
                    <Heading fontSize="7xl" align="center">7xl</Heading>
                    <Heading fontSize="8xl" align="center">8xl</Heading>
                    <Heading fontSize="9xl" align="center">9xl</Heading>
                </CenterLayout>}

                rightContent={<CenterLayout>
                    <Heading level={2} align="center">Paragraph</Heading>
                    <br />
                    <Paragraph fontSize="xl" align="justify">{text.paragraph}</Paragraph>
                    <Paragraph fontSize="xs" align="center">xs</Paragraph>
                    <Paragraph fontSize="sm" align="center">sm</Paragraph>
                    <Paragraph fontSize="base" align="center">base</Paragraph>
                    <Paragraph fontSize="lg" align="center">lg</Paragraph>
                    <Paragraph fontSize="xl" align="center">xl</Paragraph>
                    <Paragraph fontSize="2xl" align="center">2xl</Paragraph>
                    <Paragraph fontSize="3xl" align="center">3xl</Paragraph>
                    <Paragraph fontSize="4xl" align="center">4xl</Paragraph>
                    <Paragraph fontSize="5xl" align="center">5xl</Paragraph>
                    <Paragraph fontSize="6xl" align="center">6xl</Paragraph>
                    <Paragraph fontSize="7xl" align="center">7xl</Paragraph>
                    <Paragraph fontSize="8xl" align="center">8xl</Paragraph>
                    <Paragraph fontSize="9xl" align="center">9xl</Paragraph>
                </CenterLayout>}
            />
        </CenterLayout>
    );
}

export default TextTypes;
