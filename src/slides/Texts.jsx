import { TwoColumnLayout, Heading, Paragraph, CenterLayout } from '../slideComponents/index.jsx';

function Texts1() {
    return (
        <CenterLayout>
            <Heading fontSize={8} align="center">Textes</Heading>
            <br />
            <TwoColumnLayout
                leftContent={<CenterLayout>
                    <Heading align="center">Heading</Heading>
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
                </CenterLayout>}

                rightContent={<CenterLayout>
                    <Heading align="center">Paragraph</Heading>
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
                </CenterLayout>}
            />
        </CenterLayout>
    );
}

function Texts2() {
    return (
        <CenterLayout>
            <Heading fontSize={8} align="center">Textes</Heading>
            <br />
            <Heading fontSize={6} align="center">Mise en forme des textes</Heading>
            <br />
            <br />
            <TwoColumnLayout
                leftContent={<CenterLayout>
                    <Heading fontSize={4} align="center" underline={true}>Souligné</Heading>
                    <br />
                    <Paragraph fontSize={6} align="justify" underline={true}>
                        Lorem ipsum dolor sit amet, consectetur adipiscing elit. Pellentesque urna libero, vulputate et elit nec, consequat feugiat quam. Donec nec porttitor nisl, non gravida quam. Phasellus id aliquam nisi. In hac habitasse platea dictumst. Sed elementum metus sit amet purus vestibulum dictum. Curabitur enim tortor, porttitor non mauris sed, facilisis molestie lectus. Duis at leo lectus. Morbi congue odio nisi, sed fringilla eros rhoncus quis. Nullam malesuada tortor ac pharetra molestie.
                    </Paragraph>
                    <br />
                    <br />
                    <br />
                    <Heading fontSize={4} align="center" crossed={true}>Barré</Heading>
                    <br />
                    <Paragraph fontSize={6} align="justify" crossed={true}>
                        Lorem ipsum dolor sit amet, consectetur adipiscing elit. Pellentesque urna libero, vulputate et elit nec, consequat feugiat quam. Donec nec porttitor nisl, non gravida quam. Phasellus id aliquam nisi. In hac habitasse platea dictumst. Sed elementum metus sit amet purus vestibulum dictum. Curabitur enim tortor, porttitor non mauris sed, facilisis molestie lectus. Duis at leo lectus. Morbi congue odio nisi, sed fringilla eros rhoncus quis. Nullam malesuada tortor ac pharetra molestie.
                    </Paragraph>
                </CenterLayout>}

                rightContent={<CenterLayout>
                    <Heading fontSize={4} align="center" italic={true}>Italique</Heading>
                    <br />
                    <Paragraph fontSize={6} align="justify" italic={true}>
                        Lorem ipsum dolor sit amet, consectetur adipiscing elit. Pellentesque urna libero, vulputate et elit nec, consequat feugiat quam. Donec nec porttitor nisl, non gravida quam. Phasellus id aliquam nisi. In hac habitasse platea dictumst. Sed elementum metus sit amet purus vestibulum dictum. Curabitur enim tortor, porttitor non mauris sed, facilisis molestie lectus. Duis at leo lectus. Morbi congue odio nisi, sed fringilla eros rhoncus quis. Nullam malesuada tortor ac pharetra molestie.
                    </Paragraph>
                    <br />
                    <br />
                    <br />
                    <Heading fontSize={4} align="center">Gras</Heading>
                    <br />
                    <Paragraph fontSize={6} align="justify">
                        <b>
                            Lorem ipsum dolor sit amet, consectetur adipiscing elit. Pellentesque urna libero, vulputate et elit nec, consequat feugiat quam. Donec nec porttitor nisl, non gravida quam. Phasellus id aliquam nisi. In hac habitasse platea dictumst. Sed elementum metus sit amet purus vestibulum dictum. Curabitur enim tortor, porttitor non mauris sed, facilisis molestie lectus. Duis at leo lectus. Morbi congue odio nisi, sed fringilla eros rhoncus quis. Nullam malesuada tortor ac pharetra molestie.
                        </b>
                    </Paragraph>
                </CenterLayout>}
            />
        </CenterLayout>
    );
}

export { Texts1, Texts2 };