import { faListOl } from '@fortawesome/free-solid-svg-icons';
import ToolbarButton from './ToolbarButton.jsx';
import Icon from './Icon.jsx';
import { useLabels } from './hooks.js';
import { usePanels } from '../contexts/Panels.context.jsx';

/** Opens or closes the list of all slides. */
function SlideListButton({ className="" }) {
    const { isSlideListVisible, toggleSlideList } = usePanels();
    const text = useLabels();

    return (
        <ToolbarButton
            icon={<Icon icon={faListOl} />}
            label={isSlideListVisible ? text.hideSlideList : text.showSlideList}
            onClick={toggleSlideList}
            shortcut="s"
            align="left"
            className={className}
        />
    );
}

export default SlideListButton;
