import { CenterLayout, Formula, Heading, Markdown, Paragraph, TwoColumnLayout } from '../../components/index.jsx';

/** Slide presenting mathematical formulas, in a sentence, on their own line and in Markdown. */
function Formulas({ text }) {
    return (
        <CenterLayout>
            <Heading fontSize="8xl" align="center">{text.title}</Heading>
            <br /><br />
            <TwoColumnLayout
                leftContent={<CenterLayout>
                    <Heading level={2} fontSize="5xl" align="center">{text.component[0]}</Heading>
                    <br />
                    <Paragraph align="center">{text.component[1]}</Paragraph>
                    <Formula display fontSize="4xl">{String.raw`\int_{-\infty}^{+\infty} e^{-x^2}\,dx = \sqrt{\pi}`}</Formula>
                    <Formula display fontSize="4xl" color="sky-600">{String.raw`e^{i\pi} + 1 = 0`}</Formula>
                </CenterLayout>}

                rightContent={<CenterLayout>
                    <Heading level={2} fontSize="5xl" align="center">{text.markdown[0]}</Heading>
                    <br />
                    <Markdown>{text.markdown[1]}</Markdown>
                </CenterLayout>}
            />
        </CenterLayout>
    );
}

export default Formulas;
