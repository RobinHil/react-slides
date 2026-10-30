import { CenterLayout, Diagram, Heading, Paragraph, TwoColumnLayout } from '../../components/index.jsx';

/** Slide presenting diagrams written in the Mermaid language. */
function Diagrams({ text }) {
    return (
        <CenterLayout>
            <Heading fontSize="8xl" align="center">{text.title}</Heading>
            <br />
            <Paragraph align="center">{text.intro}</Paragraph>
            <br /><br />
            <TwoColumnLayout
                leftContent={<CenterLayout>
                    <Heading level={2} fontSize="5xl" align="center">{text.flowchart[0]}</Heading>
                    <br />
                    <Diagram>{text.flowchart[1]}</Diagram>
                </CenterLayout>}

                rightContent={<CenterLayout>
                    <Heading level={2} fontSize="5xl" align="center">{text.sequence[0]}</Heading>
                    <br />
                    <Diagram>{text.sequence[1]}</Diagram>
                </CenterLayout>}
            />
        </CenterLayout>
    );
}

export default Diagrams;
