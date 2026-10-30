import { useCallback, useEffect, useRef } from 'react';
import { useSlides } from '../contexts/Slides.context.jsx';
import { usePanels } from '../contexts/Panels.context.jsx';
import { useFullScreen } from '../contexts/FullScreen.context.jsx';
import SlideThumbnail from './SlideThumbnail.jsx';
import { useWhenIdle, useMediaQuery, useBreakpoint } from './hooks.js';

const PANEL_PADDING = 16;

/** List of the slide thumbnails, docked on wide screens and drawn over the slide elsewhere, revealed in full screen with the toolbar, below it from the given top. */
function SlideList({ width, isEdgeRevealed, top }) {
    const { slides, current, goTo } = useSlides();
    const { isSlideListVisible, toggleSlideList } = usePanels();
    const { isFullScreen } = useFullScreen();
    const panelRef = useRef(null);
    const currentRef = useRef(null);
    const hasHover = useMediaQuery("(hover: hover)");
    const isWideScreen = useBreakpoint("lg");
    const isHoverMode = isFullScreen && hasHover;
    const isShown = isHoverMode ? isEdgeRevealed : isSlideListVisible;
    const isReady = useWhenIdle(isShown);

    useEffect(() => {
        if (isShown)
            currentRef.current?.scrollIntoView({ block: "nearest" });
    }, [isShown, current]);

    const selectSlide = useCallback((number) => {
        goTo(number);
        if (isFullScreen ? !isHoverMode : !isWideScreen)
            toggleSlideList();
    }, [goTo, isFullScreen, isHoverMode, isWideScreen, toggleSlideList]);

    return (
        <>
            <div
                onClick={toggleSlideList}
                className={`fixed inset-0 z-35 bg-black/30 transition-opacity duration-500 ease-fluid ${isFullScreen?"":"lg:hidden"} ${isShown&&!isHoverMode?"opacity-100":"opacity-0 pointer-events-none"}`}
            />
            <div
                ref={panelRef}
                inert={!isShown}
                className={`absolute top-2 bottom-2 left-2 sm:top-4 sm:bottom-4 sm:left-4 z-40 bg-white rounded-2xl border border-gray-200 shadow-lg dark:bg-gray-900 dark:border-gray-700 dark:shadow-black/50 flex flex-col gap-3 overflow-y-auto scrollbar-none [&::-webkit-scrollbar]:hidden transition duration-500 ease-fluid ${isShown?"translate-x-0 opacity-100":"-translate-x-[calc(100%+2rem)] opacity-0"}`}
                style={{ width, padding: PANEL_PADDING, top: isHoverMode ? top : undefined }}
            >
                {isReady && slides.map((slide, index) => (
                    <SlideThumbnail
                        key={index+1}
                        ref={current===index+1 ? currentRef : undefined}
                        scrollRoot={panelRef}
                        slide={slide}
                        number={index+1}
                        isCurrent={current===index+1}
                        onSelect={selectSlide}
                    />
                ))}
            </div>
        </>
    );
}

export default SlideList;
