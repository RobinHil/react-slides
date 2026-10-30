import { useCallback, useLayoutEffect, useRef } from 'react';
import { useSlides } from '../contexts/Slides.context.jsx';
import { useFullScreen } from '../contexts/FullScreen.context.jsx';
import SlideCanvas from './SlideCanvas.jsx';
import { backgroundStyle } from '../components/styles.js';

const SWIPE_THRESHOLD = 50;
const TAP_THRESHOLD = 10;
const TRANSITIONS = "page-old:animate-none page-new:animate-none slide-old:animate-fade-out slide-new:animate-fade-in slide-frame:overflow-clip forward:slide-old:animate-slide-out-next forward:slide-new:animate-slide-in-next backward:slide-old:animate-slide-out-previous backward:slide-new:animate-slide-in-previous";

/** Shows the current slide as large as the screen allows, sets its scale on the given element, swipes between slides on touch screens, and draws the transitions between slides inside itself, leaving the rest of the page usable meanwhile, or over the whole page in browsers that cannot. */
function SlideViewer({ scaleTarget }) {
    const { slide, size, current, step, setStepCount, transitionScope, next, previous } = useSlides();
    const { isFullScreen, toggleToolbar } = useFullScreen();
    const areaRef = useRef(null);
    const touchStart = useRef(null);
    const countSteps = useCallback((count) => setStepCount(current, count), [setStepCount, current]);

    useLayoutEffect(() => {
        if (transitionScope.current.startViewTransition)
            return;
        const root = document.documentElement;
        const classes = TRANSITIONS.split(" ");
        root.classList.add(...classes);
        return () => root.classList.remove(...classes);
    }, [transitionScope]);

    useLayoutEffect(() => {
        const area = areaRef.current;
        const observer = new ResizeObserver(() => {
            scaleTarget.current.style.setProperty("--slide-scale", Math.min(area.clientWidth/size.width, area.clientHeight/size.height));
        });
        observer.observe(area);
        return () => observer.disconnect();
    }, [size, scaleTarget]);

    const handleTouchStart = (event) => {
        const touch = event.touches[0];
        touchStart.current = { x: touch.clientX, y: touch.clientY };
    };

    const handleTouchEnd = (event) => {
        if (!touchStart.current)
            return;
        const touch = event.changedTouches[0];
        const dx = touch.clientX-touchStart.current.x;
        const dy = touch.clientY-touchStart.current.y;
        touchStart.current = null;
        if (Math.abs(dx)>SWIPE_THRESHOLD && Math.abs(dx)>Math.abs(dy))
            (dx<0 ? next : previous)();
        else if (isFullScreen && Math.abs(dx)<TAP_THRESHOLD && Math.abs(dy)<TAP_THRESHOLD)
            toggleToolbar();
    };

    return (
        <div ref={transitionScope} className={`grow min-h-0 flex flex-col ${TRANSITIONS}`}>
            <div className={`grow min-h-0 [view-transition-name:slide] ${isFullScreen?"":"px-2 pb-2 sm:px-4 sm:pb-4 short:px-2 short:pb-2 phone:pt-2 phone:pb-0"}`} style={isFullScreen ? backgroundStyle(slide.background) : undefined}>
                <div ref={areaRef} onTouchStart={handleTouchStart} onTouchEnd={handleTouchEnd} className="flex items-center justify-center h-full w-full">
                    <div
                        data-slide-viewer
                        className={`relative overflow-hidden ${isFullScreen?"":"shadow-2xl ring-1 ring-gray-200 rounded-xl dark:ring-gray-700 dark:shadow-black/50"}`}
                        style={{ width: `calc(var(--slide-scale) * ${size.width}px)`, height: `calc(var(--slide-scale) * ${size.height}px)`, ...backgroundStyle(slide.background) }}
                    >
                        <SlideCanvas key={current} slide={slide} number={current} scale="var(--slide-scale)" step={step} onStepCount={countSteps} live />
                    </div>
                </div>
            </div>
        </div>
    );
}

export default SlideViewer;
