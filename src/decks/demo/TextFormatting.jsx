import { TwoColumnLayout, Heading, Paragraph, CenterLayout } from '../../components/index.jsx';

const LOREM = "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Pellentesque urna libero, vulputate et elit nec, consequat feugiat quam. Donec nec porttitor nisl, non gravida quam. Phasellus id aliquam nisi. In hac habitasse platea dictumst. Sed elementum metus sit amet purus vestibulum dictum. Curabitur enim tortor, porttitor non mauris sed, facilisis molestie lectus. Duis at leo lectus. Morbi congue odio nisi, sed fringilla eros rhoncus quis. Nullam malesuada tortor ac pharetra molestie.";

/** Slide presenting underlined, struck, italic and bold texts. */
function TextFormatting({ text }) {
    return (
        <CenterLayout>
            <Heading fontSize="8xl" align="center">{text.title}</Heading>
            <br />
            <Heading level={2} fontSize="6xl" align="center">{text.subtitle}</Heading>
            <br />
            <Paragraph fontSize="xl" align="center" color="slate-600">{text.intro}</Paragraph>
            <br />
            <br />
            <TwoColumnLayout
                leftContent={<CenterLayout>
                    <Heading level={3} fontSize="4xl" align="center" underline>{text.underline}</Heading>
                    <br />
                    <Paragraph fontSize="2xl" align="justify" underline>{LOREM}</Paragraph>
                    <br />
                    <br />
                    <br />
                    <Heading level={3} fontSize="4xl" align="center" strike>{text.strike}</Heading>
                    <br />
                    <Paragraph fontSize="2xl" align="justify" strike>{LOREM}</Paragraph>
                </CenterLayout>}

                rightContent={<CenterLayout>
                    <Heading level={3} fontSize="4xl" align="center" italic>{text.italic}</Heading>
                    <br />
                    <Paragraph fontSize="2xl" align="justify" italic>{LOREM}</Paragraph>
                    <br />
                    <br />
                    <br />
                    <Heading level={3} fontSize="4xl" align="center">{text.bold}</Heading>
                    <br />
                    <Paragraph fontSize="2xl" align="justify" bold>{LOREM}</Paragraph>
                </CenterLayout>}
            />
        </CenterLayout>
    );
}

export default TextFormatting;
