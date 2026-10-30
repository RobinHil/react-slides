import { CenterLayout, ColorSwatch, GridLayout, Heading, Paragraph, RowLayout } from '../../components/index.jsx';

const hues = ["slate", "gray", "zinc", "neutral", "stone", "mauve", "olive", "mist", "taupe", "red", "orange", "amber", "yellow", "lime", "green", "emerald", "teal", "cyan", "sky", "blue", "indigo", "violet", "purple", "fuchsia", "pink", "rose"];

const shades = [50, 100, 200, 300, 400, 500, 600, 700, 800, 900, 950];

const gradients = [
    [["sky-100", "violet-200"], `["sky-100", "violet-200"]`],
    [["amber-200", "rose-400"], `["amber-200", "rose-400"]`],
    [["sky-300", "violet-400", "rose-400", "amber-300"], `["sky-300", "violet-400", "rose-400", "amber-300"]`],
    [{ colors: ["emerald-300", "cyan-500", "indigo-600"], angle: 90 }, `{ colors: [...], angle: 90 }`]
];

/** Slide showing the whole color palette and gradients. */
function Palette({ text }) {
    return (
        <CenterLayout>
            <Heading fontSize="8xl" align="center" color={["sky-500", "violet-600", "pink-500"]}>{text.title}</Heading>
            <br />
            <Paragraph fontSize="2xl" align="center" color="slate-600">{text.intro}</Paragraph>
            <br /><br />
            <GridLayout columns={hues.length+1} gap={1} verticalAlign="center">
                <Paragraph />
                {hues.map((hue) => (
                    <Paragraph key={hue} fontSize="sm" align="center" color="slate-500">{hue}</Paragraph>
                ))}
                {shades.map((shade) => [
                    <Paragraph key={shade} fontSize="sm" align="right" color="slate-500">{shade}</Paragraph>,
                    ...hues.map((hue) => (
                        <ColorSwatch key={`${hue}-${shade}`} color={`${hue}-${shade}`} size="fill" />
                    ))
                ])}
            </GridLayout>
            <br /><br /><br />
            <RowLayout gap={10} verticalAlign="top">
                {gradients.map(([paint, code]) => (
                    <ColorSwatch key={code} color={paint} label={code} size="lg" font="mono" />
                ))}
            </RowLayout>
            <br /><br />
            <RowLayout gap={6}>
                <Heading level={2} fontSize="5xl" color={["amber-500", "rose-600"]}>{text.gradientText}</Heading>
                <Paragraph fontSize="lg" color="slate-600" font="mono">{`color={["amber-500", "rose-600"]}`}</Paragraph>
            </RowLayout>
        </CenterLayout>
    );
}

export default Palette;
