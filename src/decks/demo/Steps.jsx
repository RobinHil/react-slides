import { Card, CenterLayout, Code, GridLayout, Heading, Paragraph, Step } from '../../components/index.jsx';

/** Slide revealing its content one step at a time. */
function Steps({ text }) {
    return (
        <CenterLayout>
            <Heading fontSize="8xl" align="center">{text.title}</Heading>
            <br />
            <Paragraph fontSize="2xl" align="center" color="slate-600">{text.intro}</Paragraph>
            <br /><br />
            <GridLayout columns={3} gap={8}>
                {text.cards.map(([title, explanation], index) => (
                    <Step key={title}>
                        <Card>
                            <Heading level={2} fontSize="6xl" color={["sky-500", "violet-600"]}>{index+1}</Heading>
                            <Heading level={3} fontSize="3xl">{title}</Heading>
                            <br />
                            <Paragraph fontSize="xl" color="slate-600">{explanation}</Paragraph>
                        </Card>
                    </Step>
                ))}
            </GridLayout>
            <br /><br />
            <Step order={3}>
                <Code language="jsx" theme="light" fontSize="2xl" align="center">{text.code}</Code>
            </Step>
        </CenterLayout>
    );
}

export default Steps;
