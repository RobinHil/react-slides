import { Card, CenterLayout, Code, GridLayout, Heading, Paragraph } from '../../components/index.jsx';
import themes from '../../components/themes.js';

const THEMES = ["light", "night", "paper"];

/** Slide presenting the themes, itself drawn in the night theme. */
function Themes({ text }) {
    return (
        <CenterLayout>
            <Heading fontSize="8xl" align="center">{text.title}</Heading>
            <br />
            <Paragraph fontSize="2xl" align="center" color="slate-300">{text.intro}</Paragraph>
            <br /><br />
            <GridLayout columns={3} gap={8}>
                {THEMES.map((name) => (
                    <Card key={name} bg={themes[name].background}>
                        <Heading level={2} fontSize="5xl" font={themes[name].headingFont ?? themes[name].font} color={themes[name].color}>{text.previews[name][0]}</Heading>
                        <br />
                        <Paragraph fontSize="xl" font={themes[name].font} color={themes[name].color}>{text.previews[name][1]}</Paragraph>
                        <br />
                        <Paragraph fontSize="lg" font="mono" color={themes[name].accentColor}>themes.{name}</Paragraph>
                    </Card>
                ))}
            </GridLayout>
            <br /><br />
            <Code language="jsx" fontSize="2xl" align="center">{
`<Presentation theme={themes.paper}>
    <Slide theme={themes.night}>...</Slide>
</Presentation>`
            }</Code>
        </CenterLayout>
    );
}

export default Themes;
