import { CenterLayout, Heading, Markdown, TwoColumnLayout, Paragraph } from '../../components/index.jsx';

/** Slide presenting the Markdown component. */
function MarkdownContent({ text }) {
    return (
        <CenterLayout>
            <Heading align="center" fontSize="8xl">Markdown</Heading>
            <br /><br />
            <TwoColumnLayout
                leftContent={<CenterLayout>
                    <Markdown>{text.left}</Markdown>
                </CenterLayout>}

                rightContent={<CenterLayout>
                    <Markdown>{text.right}</Markdown>
                </CenterLayout>}
            />
            <br />
            <Paragraph fontSize="2xl" align="center">
                <i>{text.footnote}</i>
            </Paragraph>
        </CenterLayout>
    );
}

export default MarkdownContent;
