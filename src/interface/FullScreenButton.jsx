import { faCompress, faExpand } from '@fortawesome/free-solid-svg-icons';
import ToolbarButton from './ToolbarButton.jsx';
import Icon from './Icon.jsx';
import { useLabels } from './hooks.js';
import { useFullScreen } from '../contexts/FullScreen.context.jsx';

/** Enters or leaves full screen. */
function FullScreenButton() {
    const { toggleFullScreen, isFullScreen } = useFullScreen();
    const text = useLabels();

    return (
        <ToolbarButton
            icon={<Icon icon={isFullScreen ? faCompress : faExpand} />}
            label={isFullScreen ? text.exitFullScreen : text.fullScreen}
            onClick={toggleFullScreen}
            shortcut="f"
            align="right"
        />
    );
}

export default FullScreenButton;
