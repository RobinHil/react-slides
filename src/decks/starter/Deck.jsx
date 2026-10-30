import { Presentation, Slide } from '../../interface/index.jsx';
import { CenterLayout, Heading, Paragraph, Step } from '../../components/index.jsx';
import pageNumber from '../../components/pageNumber.js';
import themes from '../../components/themes.js';

/** Minimal deck to copy when starting a new presentation. */
function Deck() {
    return (
        <Presentation lang="fr" theme={themes.paper} corners={{ bottomRight: pageNumber }}>
            <Slide corners={false}>
                <CenterLayout>
                    <Heading fontSize="9xl" align="center">Mon titre</Heading>
                    <br />
                    <Paragraph fontSize="3xl" align="center">Un sous-titre pour présenter le sujet</Paragraph>
                </CenterLayout>
            </Slide>
            <Slide notes={`
                Ce qu'il faut dire sur cette diapositive.
            `}>
                <CenterLayout>
                    <Heading fontSize="7xl">Une idée par diapositive</Heading>
                    <br />
                    <Step><Paragraph fontSize="3xl">1. Copier le dossier src/decks/starter</Paragraph></Step>
                    <Step><Paragraph fontSize="3xl">2. Le renommer : son nom devient l'adresse du deck</Paragraph></Step>
                    <Step><Paragraph fontSize="3xl">3. Écrire ses diapositives dans Deck.jsx, et son titre dans meta.js</Paragraph></Step>
                </CenterLayout>
            </Slide>
            <Slide theme={themes.night} corners={false}>
                <CenterLayout>
                    <Heading fontSize="8xl" align="center">Merci</Heading>
                </CenterLayout>
            </Slide>
        </Presentation>
    );
}

export default Deck;
