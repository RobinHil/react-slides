import { TwoColumnLayout, Heading, List, Paragraph } from '../slideComponents/index.jsx';

function Texts() {
    return (
        <>
            <br />
            <br />
            <Heading fontSize={8} align="center" color="blue">Textes simples</Heading>
            <br />
            <br />
            <br />
            <br />
            <TwoColumnLayout
                leftContent={<>
                    <Heading align="center" underline={true}>Heading</Heading>
                    <br />
                    <Paragraph fontSize={5} align="justify">
                        Le premier type de texte simple est le composant Heading, il sert à afficher des titres.
                        Sa particularité est que les textes sont toujours en gras, et les tailles de base sont plus grandes
                        que pour les autres composants.<br />
                        Les tailles vont de 1 à 9 :
                    </Paragraph>
                    <Heading fontSize={1} align="center">Taille 1</Heading>
                    <Heading fontSize={2} align="center">Taille 2</Heading>
                    <Heading fontSize={3} align="center">Taille 3</Heading>
                    <Heading fontSize={4} align="center">Taille 4</Heading>
                    <Heading fontSize={5} align="center">Taille 5</Heading>
                    <Heading fontSize={6} align="center">Taille 6</Heading>
                    <Heading fontSize={7} align="center">Taille 7</Heading>
                    <Heading fontSize={8} align="center">Taille 8</Heading>
                    <Heading fontSize={9} align="center">Taille 9</Heading>
                </>}

                rightContent={<>
                    <Heading align="center" underline={true}>Paragraph</Heading>
                    <br />
                    <Paragraph fontSize={5} align="justify">
                        Le second type de texte simple est le composant Paragraph. Il sert à afficher des textes simples.<br />
                        Les tailles vont de 1 à 13 :
                    </Paragraph>
                    <Paragraph fontSize={1} align="center">Taille 1</Paragraph>
                    <Paragraph fontSize={2} align="center">Taille 2</Paragraph>
                    <Paragraph fontSize={3} align="center">Taille 3</Paragraph>
                    <Paragraph fontSize={4} align="center">Taille 4</Paragraph>
                    <Paragraph fontSize={5} align="center">Taille 5</Paragraph>
                    <Paragraph fontSize={6} align="center">Taille 6</Paragraph>
                    <Paragraph fontSize={7} align="center">Taille 7</Paragraph>
                    <Paragraph fontSize={8} align="center">Taille 8</Paragraph>
                    <Paragraph fontSize={9} align="center">Taille 9</Paragraph>
                    <Paragraph fontSize={10} align="center">Taille 10</Paragraph>
                    <Paragraph fontSize={11} align="center">Taille 11</Paragraph>
                    <Paragraph fontSize={12} align="center">Taille 12</Paragraph>
                    <Paragraph fontSize={13} align="center">Taille 13</Paragraph>
                </>}
            />
        </>
    );
}

export default Texts;