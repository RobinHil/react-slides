import { faNoteSticky } from '@fortawesome/free-solid-svg-icons';
import ToolbarButton from './ToolbarButton.jsx';
import Icon from './Icon.jsx';
import { useLabels } from './hooks.js';
import { usePanels } from '../contexts/Panels.context.jsx';

/** Opens or closes the notes panel. */
function NotesButton({ className="" }) {
    const { isNotesVisible, toggleNotes } = usePanels();
    const text = useLabels();

    return (
        <ToolbarButton
            icon={<Icon icon={faNoteSticky} />}
            label={isNotesVisible ? text.hideNotes : text.showNotes}
            onClick={toggleNotes}
            shortcut="n"
            align="left"
            className={className}
        />
    );
}

export default NotesButton;
