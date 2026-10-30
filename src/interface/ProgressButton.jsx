import ToolbarButton from './ToolbarButton.jsx';
import { useLabels } from './hooks.js';
import { usePanels } from '../contexts/Panels.context.jsx';

/** Progress bar icon, crossed out while the bar is hidden. */
function ProgressBarIcon({ isCrossed=false }) {
    return (
        <svg viewBox="0 0 24 24" className="w-6 h-6" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" aria-hidden="true">
            <rect x="2" y="9" width="20" height="6" rx="3" />
            <rect x="2" y="9" width="12" height="6" rx="3" fill="currentColor" stroke="none" />
            {isCrossed && <line x1="4" y1="4" x2="20" y2="20" />}
        </svg>
    );
}

/** Shows or hides the progress bar. */
function ProgressButton({ className="" }) {
    const { isProgressVisible, toggleProgress } = usePanels();
    const text = useLabels();

    return (
        <ToolbarButton
            icon={<ProgressBarIcon isCrossed={!isProgressVisible} />}
            label={isProgressVisible ? text.hideProgress : text.showProgress}
            onClick={toggleProgress}
            shortcut="b"
            className={className}
        />
    );
}

export default ProgressButton;
