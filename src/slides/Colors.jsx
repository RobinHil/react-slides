import { CenterLayout, Heading, TwoColumnLayout, Paragraph } from '../slideComponents/index.jsx';

function Colors() {
    return (
        <CenterLayout>
            <Heading fontSize={8} align="center">Couleurs</Heading>
            <br />
            <br />
            <TwoColumnLayout
                leftContent={<CenterLayout>
                    <Heading align="center">Texte</Heading>
                    <br />
                    <Paragraph fontSize={6} align="center">
                        Il existe différentes possibilitées prédéfinies<br />
                        en ce qui concerne les couleurs de texte.
                    </Paragraph>
                    <br />
                    <Paragraph fontSize={6} align="center" color="black">black</Paragraph>
                    <Paragraph fontSize={6} align="center" color="white" bg="lightGray">white</Paragraph>
                    <Paragraph fontSize={6} align="center" color="gray">gray</Paragraph>
                    <Paragraph fontSize={6} align="center" color="lightGray">lightGray</Paragraph>
                    <Paragraph fontSize={6} align="center" color="darkGray">darkGray</Paragraph>
                    <Paragraph fontSize={6} align="center" color="red">red</Paragraph>
                    <Paragraph fontSize={6} align="center" color="orange">orange</Paragraph>
                    <Paragraph fontSize={6} align="center" color="yellow">yellow</Paragraph>
                    <Paragraph fontSize={6} align="center" color="lime">lime</Paragraph>
                    <Paragraph fontSize={6} align="center" color="green">green</Paragraph>
                    <Paragraph fontSize={6} align="center" color="cyan">cyan</Paragraph>
                    <Paragraph fontSize={6} align="center" color="sky">sky</Paragraph>
                    <Paragraph fontSize={6} align="center" color="blue">blue</Paragraph>
                    <Paragraph fontSize={6} align="center" color="violet">violet</Paragraph>
                    <Paragraph fontSize={6} align="center" color="pink">pink</Paragraph>
                </CenterLayout>}

                rightContent={<CenterLayout>
                    <Heading align="center">Fond</Heading>
                    <br />
                    <Paragraph fontSize={6} align="justify">
                        Il existe différentes possibilitées prédéfinies<br />
                        en ce qui concerne les couleurs de fond.
                    </Paragraph>
                    <br />
                    <Paragraph fontSize={6} align="center" color="white" bg="black">black</Paragraph>
                    <Paragraph fontSize={6} align="center" bg="white">white</Paragraph>
                    <Paragraph fontSize={6} align="center" bg="gray">gray</Paragraph>
                    <Paragraph fontSize={6} align="center" bg="lightGray">lightGray</Paragraph>
                    <Paragraph fontSize={6} align="center" color="white" bg="darkGray">darkGray</Paragraph>
                    <Paragraph fontSize={6} align="center" bg="red">red</Paragraph>
                    <Paragraph fontSize={6} align="center" bg="orange">orange</Paragraph>
                    <Paragraph fontSize={6} align="center" bg="yellow">yellow</Paragraph>
                    <Paragraph fontSize={6} align="center" bg="lime">lime</Paragraph>
                    <Paragraph fontSize={6} align="center" bg="green">green</Paragraph>
                    <Paragraph fontSize={6} align="center" bg="cyan">cyan</Paragraph>
                    <Paragraph fontSize={6} align="center" bg="sky">sky</Paragraph>
                    <Paragraph fontSize={6} align="center" bg="blue">blue</Paragraph>
                    <Paragraph fontSize={6} align="center" bg="violet">violet</Paragraph>
                    <Paragraph fontSize={6} align="center" bg="pink">pink</Paragraph>
                    <Paragraph fontSize={6} align="center" bg="transparent">transparent</Paragraph>
                </CenterLayout>}
            />
            <br />
            <Paragraph fontSize={6} align="center" italic={true}>
                Ces couleurs sont applicables sur les textes, mais également sur les listes ainsi que sur les tableaux.
            </Paragraph>
        </CenterLayout>
    );
}

export default Colors;