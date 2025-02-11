import { CenterLayout, Heading, Image, Paragraph } from '../slideComponents/index.jsx';

function Title() {
    return (
        <CenterLayout>
            <Heading align="center" fontSize={9} color="red">React Slides</Heading>
            <br />
            <br />
            <br />
            <Heading fontSize={5} italic={true} color="blue" align="center">Une bibliothèque de composants React</Heading>
            <br />
            <Paragraph fontSize={6} align="center">
                Créez vos supports de présentation à partir de composants React<br/>
                personnalisables, et accédez ainsi à vos médias en toutes circonstances<br/>
                à partir d'une simple connexion internet et d'un navigateur web.
            </Paragraph>
            <br /><br />
            <br /><br />
            <Paragraph fontSize={5} align="center" italic={true}>
                Par Robin HILAIRE
            </Paragraph>
        </CenterLayout>
    );
}

export default Title;