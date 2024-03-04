import { CenterLayout, Heading, TwoColumnLayout, Paragraph, Image } from '../slideComponents/index.jsx';

function Images() {
    return (
        <CenterLayout>
            <Heading fontSize={8} align="center">Images</Heading>
            <br /><br />
            <br /><br />
            <br /><br />
            <TwoColumnLayout
                leftContent={<TwoColumnLayout
                    leftContent={<CenterLayout>
                        <Heading fontSize={5} align="center">Simple</Heading>
                        <br />
                        <Paragraph align="justify">
                            On peut créer une image simple.
                            Elle sera placée dans le dossier public, ou directement dans les assets.
                        </Paragraph>
                        <br />
                        <Image src="/chat.jpg" alt="Un chat en tga convertit en jpg. Merci M. REMY pour ce beau chat." align="center" />
                    </CenterLayout>}
    
                    rightContent={<CenterLayout>
                        <Heading fontSize={5} align="center">Légendée</Heading>
                        <br />
                        <Paragraph align="justify">
                            On peut créer une image légendée.
                            Elle sera alors incluse dans une figure.
                            La légende est en italique et par défaut en petit texte.
                        </Paragraph>
                        <br />
                        <Image src="/chat.jpg" alt="Un chat en tga convertit en jpg. Merci M. REMY pour ce beau chat." align="center">
                            Voici une image légendée sous forme de figure.
                        </Image>
                    </CenterLayout>}
                />}

                rightContent={<TwoColumnLayout
                    leftContent={<CenterLayout>
                        <Heading fontSize={5} align="center">Taille</Heading>
                        <br />
                        <Paragraph align="justify">
                            On peut modifier la taille d'une image, pour la réduire seulement.
                            Elle gardera alors le même ratio largeur/hauteur afin d'éviter toute déformation de l'image.<br />
                            Cela se fait grâce à la props "width" qui prend des valeurs en fraction.
                        </Paragraph>
                        <br />
                        <Image src="/chat.jpg" alt="Un chat en tga convertit en jpg. Merci M. REMY pour ce beau chat." align="center" width="1/2">
                            Voici la même image avec une taille réduite par width="1/2".
                        </Image>
                    </CenterLayout>}
    
                    rightContent={<CenterLayout>
                        <Heading fontSize={5} align="center">Légende</Heading>
                        <br />
                        <Paragraph align="justify">
                            On peut mettre en forme la légende d'une image en y plaçant un composant de texte.
                            On doit pour cela remplacer le children en texte brut par un composant.
                        </Paragraph>
                        <br />
                        <Image src="/chat.jpg" alt="Un chat en tga convertit en jpg. Merci M. REMY pour ce beau chat." align="center">
                            <Heading fontSize={3} align="center">
                                Voici une légende gérée par un beau composant Heading.
                            </Heading>
                        </Image>
                    </CenterLayout>}
                />}
            />
        </CenterLayout>
    );
}

export default Images;