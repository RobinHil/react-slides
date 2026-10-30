import { CenterLayout, Code, Heading, TwoColumnLayout } from '../../components/index.jsx';

/** Slide presenting syntax highlighted code. */
function CodeHighlighting({ text }) {
    return (
        <CenterLayout>
            <Heading align="center" fontSize="8xl">{text.title}</Heading>
            <br /><br />
            <TwoColumnLayout
                leftContent={<CenterLayout>
                    <Heading level={2} align="center">{text.dark}</Heading>
                    <br />
                    <Code language="cpp">{text.sample}</Code>
                </CenterLayout>}

                rightContent={<CenterLayout>
                    <Heading level={2} align="center">{text.light}</Heading>
                    <br />
                    <Code theme="light" language="cpp">{text.sample}</Code>
                </CenterLayout>}
            />
        </CenterLayout>
    );
}

export default CodeHighlighting;
