import { faQuestion } from '@fortawesome/free-solid-svg-icons';
import ToolbarButton from './ToolbarButton.jsx';
import Icon from './Icon.jsx';
import { shownShortcuts, useLabels } from './hooks.js';
import { usePanels } from '../contexts/Panels.context.jsx';

/** Shows or hides the keyboard shortcuts of the controls shown, left out of screens without a mouse. */
function HelpButton({ className="" }) {
    const { toggleHelp } = usePanels();
    const text = useLabels();

    return (
        <ToolbarButton icon={<Icon icon={faQuestion} />} label={text.help} onClick={() => toggleHelp(shownShortcuts())} shortcut="?" align="right" className={className} />
    );
}

export default HelpButton;
