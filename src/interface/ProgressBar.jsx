import { useSlides } from '../contexts/Slides.context.jsx';
import { usePanels } from '../contexts/Panels.context.jsx';
import { useFullScreen } from '../contexts/FullScreen.context.jsx';
import { useLabels } from './hooks.js';
import { backgroundStyle } from '../components/styles.js';

/** Bar at the bottom of the screen showing how far the deck has gone, each slide sharing its part between its start and its steps, which slides away when hidden. */
function ProgressBar() {
    const { slide, current, total, step, stepCount } = useSlides();
    const progress = (current-1+(Math.min(step, stepCount)+1)/(stepCount+1))/total;
    const { isProgressVisible } = usePanels();
    const { isFullScreen } = useFullScreen();
    const text = useLabels();

    return (
        <div
            aria-hidden={!isProgressVisible}
            className={`shrink-0 flex flex-col justify-end overflow-hidden transition-[height] duration-300 ease-fluid ${isProgressVisible?"h-2.5 short:h-2":"h-0"}`}
            style={isFullScreen ? backgroundStyle(slide.background) : undefined}
        >
            <div role="progressbar" aria-label={text.progress} aria-valuemin={0} aria-valuemax={100} aria-valuenow={Math.round(progress*100)} className={`shrink-0 h-2.5 short:h-2 ${isFullScreen?"bg-gray-500/20":"bg-gray-100 dark:bg-gray-800"}`}>
                <div
                    className="h-full bg-accent transition-[width] duration-300 ease-fluid"
                    style={{ width: `${progress*100}%` }}
                />
            </div>
        </div>
    );
}

export default ProgressBar;
