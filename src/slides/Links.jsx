import { CenterLayout, Link, Heading, Paragraph } from '../slideComponents/index.jsx';

function Links() {
    return (
        <CenterLayout>
            <Heading align="center" fontSize={8}>Liens</Heading>
            <br /><br />
            <br /><br />
            <Paragraph fontSize={7} align="center">
                Il est possible d'ajouter des liens hypertextes directement intégrés<br />
                à la présentation de manière très simple grâce au composant Link.
            </Paragraph>
            <br />
            <br />
            <Paragraph fontSize={7} align="center">Voici par exemple un <Link fontSize={7} href="https://google.fr">lien vers google.fr</Link>.</Paragraph>
        </CenterLayout>
    );
}

export default Links;