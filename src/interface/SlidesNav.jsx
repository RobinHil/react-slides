import { useRef, useState } from 'react';
import { faBackwardFast, faCaretLeft, faCaretRight, faForwardFast } from '@fortawesome/free-solid-svg-icons';
import ToolbarButton from './ToolbarButton.jsx';
import Icon from './Icon.jsx';
import { useShortcut, useLabels } from './hooks.js';
import { useSlides } from '../contexts/Slides.context.jsx';

const DIGIT = /^[0-9]$/;

/** Navigation buttons around the field where the slide number can be typed, going there on Enter or on leaving the field, as many as the width of the bar around it allows. */
function SlidesNav() {
    const { current, total, goTo, next, previous, first, last } = useSlides();
    const text = useLabels();
    const inputRef = useRef(null);
    const cancelledRef = useRef(false);
    const [draft, setDraft] = useState(null);

    const commit = () => {
        if (draft && !cancelledRef.current)
            goTo(parseInt(draft));
        cancelledRef.current = false;
        setDraft(null);
    };

    const handleKeyDown = (event) => {
        if (event.key==="Escape")
            cancelledRef.current = true;
        if (event.key==="Enter" || event.key==="Escape")
            event.target.blur();
    };

    useShortcut(DIGIT, () => inputRef.current.focus(), inputRef);

    return (
        <div className="flex items-center gap-0.5 sm:gap-1 min-w-0">
            <ToolbarButton icon={<Icon icon={faBackwardFast} />} label={text.firstSlide} onClick={first} shortcut="ArrowDown" className="hidden @min-[705px]:inline-flex" />
            <ToolbarButton icon={<Icon icon={faCaretLeft} />} label={text.previousSlide} onClick={previous} shortcut={["ArrowLeft", "PageUp"]} />
            <input
                ref={inputRef}
                value={draft ?? current}
                onChange={(event) => setDraft(event.target.value.replace(/\D/g, ""))}
                onFocus={(event) => event.target.select()}
                onBlur={commit}
                onKeyDown={handleKeyDown}
                name="slide-number-input"
                inputMode="numeric"
                aria-label={text.slideNumber}
                className="h-11 w-10 sm:w-12 min-w-0 text-center bg-transparent font-semibold text-base text-gray-700 transition ease-in-out delay-50 hover:text-gray-800 hover:bg-gray-300 dark:text-gray-200 dark:hover:text-gray-100 dark:hover:bg-gray-700 rounded-full outline-hidden focus-visible:ring-2 focus-visible:ring-accent"
            />
            <span className="hidden @min-[325px]:inline pr-1 text-base text-gray-500 dark:text-gray-400 tabular-nums whitespace-nowrap">/ {total}</span>
            <ToolbarButton icon={<Icon icon={faCaretRight} />} label={text.nextSlide} onClick={next} shortcut={["ArrowRight", "PageDown"]} />
            <ToolbarButton icon={<Icon icon={faForwardFast} />} label={text.lastSlide} onClick={last} shortcut="ArrowUp" className="hidden @min-[705px]:inline-flex" />
        </div>
    );
}

export default SlidesNav;
