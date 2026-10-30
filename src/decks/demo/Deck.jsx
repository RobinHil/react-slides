import DemoDeck from './DemoDeck.jsx';
import text from './text/fr.jsx';

/** Demo deck of the library, in French. */
function Deck() {
    return <DemoDeck text={text} lang="fr" />;
}

export default Deck;
