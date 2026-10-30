import ToolbarButton from './ToolbarButton.jsx';
import { useLabels } from './hooks.js';
import { usePanels } from '../contexts/Panels.context.jsx';

/** Icon of four rounded squares standing for the mosaic. */
function MosaicIcon() {
    return (
        <svg viewBox="0 0 20 20" className="w-5 h-5" fill="currentColor" aria-hidden="true">
            <rect x="1" y="1" width="8" height="8" rx="2" />
            <rect x="11" y="1" width="8" height="8" rx="2" />
            <rect x="1" y="11" width="8" height="8" rx="2" />
            <rect x="11" y="11" width="8" height="8" rx="2" />
        </svg>
    );
}

/** Opens or closes the full screen mosaic of all slides. */
function MosaicButton() {
    const { isMosaicVisible, toggleMosaic } = usePanels();
    const text = useLabels();

    return (
        <ToolbarButton
            icon={<MosaicIcon />}
            label={isMosaicVisible ? text.hideMosaic : text.showMosaic}
            onClick={toggleMosaic}
            shortcut="m"
            align="left"
        />
    );
}

export default MosaicButton;
