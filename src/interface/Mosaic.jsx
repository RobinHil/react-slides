import { useCallback, useEffect, useLayoutEffect, useRef } from 'react';
import { useSlides } from '../contexts/Slides.context.jsx';
import { usePanels } from '../contexts/Panels.context.jsx';
import SlideThumbnail from './SlideThumbnail.jsx';
import { faXmark } from '@fortawesome/free-solid-svg-icons';
import ToolbarButton from './ToolbarButton.jsx';
import Icon from './Icon.jsx';
import { useWhenIdle, useLabels } from './hooks.js';

/** Counts the columns currently laid out by a grid. */
function columnCount(grid) {
    return getComputedStyle(grid).gridTemplateColumns.split(" ").length;
}

/** Full screen mosaic of all slides, fading in with a slight zoom. */
function Mosaic() {
    const { slides, current, total, goTo } = useSlides();
    const { isMosaicVisible, toggleMosaic, isHelpVisible } = usePanels();
    const overlayRef = useRef(null);
    const gridRef = useRef(null);
    const wasVisibleRef = useRef(false);
    const isReady = useWhenIdle(isMosaicVisible);
    const text = useLabels();

    useLayoutEffect(() => {
        if (wasVisibleRef.current===isMosaicVisible)
            return;
        wasVisibleRef.current = isMosaicVisible;
        const overlay = overlayRef.current;

        if (isMosaicVisible) {
            gridRef.current.children[current-1]?.scrollIntoView({ block: "center" });
            overlay.focus({ preventScroll: true });
        }
        else if (overlay.contains(document.activeElement))
            document.activeElement.blur();
    }, [isMosaicVisible, current]);

    useEffect(() => {
        if (!isMosaicVisible || isHelpVisible)
            return;
        const moves = {
            ArrowLeft: () => -1,
            ArrowRight: () => 1,
            ArrowUp: () => -columnCount(gridRef.current),
            ArrowDown: () => columnCount(gridRef.current)
        };
        const handleKeyDown = (event) => {
            if (event.ctrlKey || event.metaKey || event.altKey)
                return;
            if (event.key==="Escape") {
                event.stopPropagation();
                toggleMosaic();
                return;
            }
            if (event.key==="Enter" && !event.target.closest("button, input")) {
                event.stopPropagation();
                toggleMosaic();
                return;
            }
            if (!moves[event.key])
                return;
            event.stopPropagation();
            event.preventDefault();
            const next = Math.min(Math.max(current+moves[event.key](), 1), total);
            goTo(next);
            gridRef.current.children[next-1]?.scrollIntoView({ block: "nearest", behavior: "smooth" });
        };
        window.addEventListener("keydown", handleKeyDown, true);
        return () => window.removeEventListener("keydown", handleKeyDown, true);
    }, [isMosaicVisible, isHelpVisible, current, total, goTo, toggleMosaic]);

    const selectSlide = useCallback((number) => {
        goTo(number);
        toggleMosaic();
    }, [goTo, toggleMosaic]);

    return (
        <>
            <div className={`fixed inset-0 z-50 pointer-events-none bg-gray-100/90 backdrop-blur-md dark:bg-gray-950/90 transition-opacity duration-500 ease-fluid ${isMosaicVisible?"opacity-100":"opacity-0"}`} />
            <div
                ref={overlayRef}
                tabIndex={-1}
                inert={!isMosaicVisible}
                role="dialog"
                aria-modal="true"
                aria-label={text.mosaic}
                onClick={(event) => !event.target.closest("button, a") && toggleMosaic()}
                className={`fixed inset-0 z-50 outline-hidden overflow-y-auto scrollbar-none [&::-webkit-scrollbar]:hidden duration-500 ease-fluid ${isMosaicVisible?"visible opacity-100 scale-100 transition-[opacity,scale]":"invisible opacity-0 scale-97 transition-[opacity,scale,visibility]"}`}
            >
                <div className="mx-auto max-w-(--breakpoint-2xl) px-4 pb-8 pt-4 sm:px-8 sm:pt-6">
                    <div className="mb-4 sm:mb-6 flex items-center justify-between gap-4">
                        <div>
                            <h2 className="text-xl sm:text-2xl font-bold text-gray-800 dark:text-gray-100">{text.mosaic}</h2>
                            <p className="text-sm text-gray-500 dark:text-gray-400 tabular-nums">{current} / {total}</p>
                        </div>
                        <div className="rounded-full bg-white shadow-lg border border-gray-200 dark:bg-gray-900 dark:border-gray-700 dark:shadow-black/50">
                            <ToolbarButton icon={<Icon icon={faXmark} />} label={text.close} onClick={toggleMosaic} shortcut={isMosaicVisible ? "Escape" : undefined} align="right" />
                        </div>
                    </div>
                    <div ref={gridRef} className="grid grid-cols-2 gap-3 sm:grid-cols-3 sm:gap-5 lg:grid-cols-4 2xl:grid-cols-5">
                        {isReady && slides.map((slide, index) => (
                            <SlideThumbnail
                                key={index+1}
                                scrollRoot={overlayRef}
                                slide={slide}
                                number={index+1}
                                isCurrent={current===index+1}
                                onSelect={selectSlide}
                            />
                        ))}
                    </div>
                </div>
            </div>
        </>
    );
}

export default Mosaic;
