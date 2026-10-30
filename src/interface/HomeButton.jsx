import { faHouse } from '@fortawesome/free-solid-svg-icons';
import ToolbarButton from './ToolbarButton.jsx';
import Icon from './Icon.jsx';
import { useLabels } from './hooks.js';
import { useHome } from '../contexts/Home.context.jsx';

/** Leads back to the home page listing the decks. */
function HomeButton() {
    const home = useHome();
    const text = useLabels();

    return (
        <ToolbarButton icon={<Icon icon={faHouse} />} label={text.home} href={home} shortcut="h" align="left" />
    );
}

export default HomeButton;
