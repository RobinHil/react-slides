import { CenterLayout, Code, ColorSwatch, Heading, Paragraph, RowLayout } from '../../components/index.jsx';

const swatches = [
    ["white", "white"],
    ["slate-100", "slate-100"],
    ["sky-100", "sky-100"],
    ["emerald-100", "emerald-100"],
    ["amber-100", "amber-100"],
    ["rose-100", "rose-100"],
    ["violet-100", "violet-100"],
    ["slate-900", "slate-900"],
    ["indigo-950", "indigo-950"],
    [["sky-100", "violet-200"], null],
    [["amber-200", "rose-300"], null],
    [["emerald-300", "cyan-500", "indigo-600"], null]
];

/** Slide presenting slide backgrounds. */
function Backgrounds({ text }) {
    return (
        <CenterLayout>
            <Heading fontSize="9xl" align="center" color="white">{text.title}</Heading>
            <br /><br />
            <Paragraph fontSize="4xl" align="center" color="gray-400">{text.intro}</Paragraph>
            <br /><br />
            <Code language="javascript" theme="light" fontSize="4xl" align="center">{
`<Slide background="gray-800">
<Slide background={["sky-100", "violet-200"]}>`
            }</Code>
            <br /><br /><br /><br />
            <RowLayout gap={6} verticalAlign="top">
                {swatches.map(([paint, label], index) => (
                    <ColorSwatch key={index} color={paint} label={label ?? text.gradient} fontSize="xl" labelColor="gray-300" />
                ))}
            </RowLayout>
            <br /><br /><br /><br />
            <Paragraph fontSize="3xl" align="center" color="gray-400">
                <i>{text.footnote}</i>
            </Paragraph>
        </CenterLayout>
    );
}

export default Backgrounds;
