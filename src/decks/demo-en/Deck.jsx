import DemoDeck from '../demo/DemoDeck.jsx';
import text from '../demo/text/en.jsx';

/** Demo deck of the library, in English. */
function Deck() {
    return <DemoDeck text={text} lang="en" />;
}

export default Deck;
