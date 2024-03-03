import { CenterLayout, Heading, List } from '../slideComponents/index.jsx';

function Summary() {
    return (
        <CenterLayout>
            <Heading fontSize={8} align="center" color="blue">Sommaire</Heading>
            <br />
            <br />
            <List type="numbered" align="center" fontSize={7} list={[
                "Textes simples",
                "Couleurs",
                "Images",
                "Listes",
                "Tableaux",
                "Zones de code",
                "Markdown"
            ]} />
        </CenterLayout>
    );
}

export default Summary;