import { CenterLayout, Heading, Paragraph, TwoColumnLayout, List } from '../slideComponents/index.jsx';

function Lists() {
    return (
        <CenterLayout>
            <Heading align="center" fontSize={8}>Listes</Heading>
            <br /><br />
            <br /><br />
            <br /><br />
            <TwoColumnLayout
                leftContent={<TwoColumnLayout
                    leftContent={<CenterLayout>
                        <Heading fontSize={5} align="center">Puces</Heading>
                        <br /><br />
                        <Paragraph align="justify">
                            On peut créer une liste à puces basique à partir d'un simple tableau de chaînes de caractères.<br />
                            <br />
                            On obtient par exemple :
                        </Paragraph>
                        <br />
                        <List list={[
                            "Premier élément",
                            "Deuxième élément",
                            "Troisième élément",
                            "Quatrième élément",
                            "Cinquième élément",
                            "Sixième élément",
                            "..."
                        ]} type="bulleted" />
                    </CenterLayout>}
    
                    rightContent={<CenterLayout>
                        <Heading fontSize={5} align="center">Numéros</Heading>
                        <br /><br />
                        <Paragraph align="justify">
                            On peut créer une liste numérotée basique à partir d'un simple tableau de chaînes de caractères.<br />
                            <br />
                            On obtient par exemple :
                        </Paragraph>
                        <br />
                        <List list={[
                            "Premier élément",
                            "Deuxième élément",
                            "Troisième élément",
                            "Quatrième élément",
                            "Cinquième élément",
                            "Sixième élément",
                            "..."
                        ]} type="numbered" />
                    </CenterLayout>}
                />}

                rightContent={<TwoColumnLayout
                    leftContent={<CenterLayout>
                        <Heading fontSize={5} align="center">Mises en forme</Heading>
                        <br /><br />
                        <Paragraph align="justify">
                            On peut mettre en forme une liste en fonction des styles qu'on y place.
                            Il est donc possible de modifier le style des textes de la liste.<br />
                            <br />
                            On obtient par exemple :
                        </Paragraph>
                        <br />
                        <List list={[
                            <b>Texte gras</b>,
                            <u>Texte souligné</u>,
                            <i>Texte italique</i>,
                            <s>Texte barré</s>,
                            "Fond bleu de liste",
                            "Texte rouge de liste",
                            "Texte plus petit",
                            "..."
                        ]} type="bulleted" fontSize={5} bg="blue" color="red" />
                    </CenterLayout>}
    
                    rightContent={<CenterLayout>
                        <Heading fontSize={5} align="center">Alignements</Heading>
                        <br /><br />
                        <Paragraph align="justify">
                            On peut aligner les listes de plusieurs manières :<br />
                            <br />
                            À gauche (par défaut) :
                        </Paragraph>
                        <List list={[
                            "Premier élément",
                            "..."
                        ]} type="bulleted" />
                        <br />
                        <Paragraph align="justify">
                            À droite :
                        </Paragraph>
                        <List list={[
                            "Deuxième élément",
                            "..."
                        ]} type="bulleted" align="right" />
                        <br />
                        <Paragraph align="justify">
                            Au centre :
                        </Paragraph>
                        <List list={[
                            "Troisième élément",
                            "..."
                        ]} type="bulleted" align="center" />
                    </CenterLayout>}
                />}
            />
        </CenterLayout>
    );
}

export default Lists;