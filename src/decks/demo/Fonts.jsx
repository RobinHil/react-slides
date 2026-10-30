import { Card, CenterLayout, GridLayout, Heading, Paragraph } from '../../components/index.jsx';

const fonts = ["sans", "serif", "mono", "inter", "poppins", "montserrat", "playfair-display", "merriweather", "lora", "jetbrains-mono", "caveat"];

/** Slide showing the fonts available to the deck. */
function Fonts({ text }) {
    return (
        <CenterLayout>
            <Heading fontSize="8xl" align="center">{text.title}</Heading>
            <br />
            <Paragraph fontSize="2xl" align="center" color="slate-600">{text.intro}</Paragraph>
            <br /><br />
            <GridLayout columns={4} gap={6}>
                {fonts.map((name) => (
                    <Card key={name}>
                        <Paragraph fontSize="base" font="mono" color="slate-500">font="{name}"</Paragraph>
                        <Heading level={2} fontSize="4xl" font={name}>{text.sample}</Heading>
                        <Paragraph fontSize="xl" font={name} color="slate-600">{text.sampleEnd} <i>0123456789</i></Paragraph>
                    </Card>
                ))}
            </GridLayout>
        </CenterLayout>
    );
}

export default Fonts;
