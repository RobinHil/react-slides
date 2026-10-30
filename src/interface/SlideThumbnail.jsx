import { memo, useEffect, useLayoutEffect, useMemo, useRef, useState } from 'react';
import { flushSync } from 'react-dom';
import SlideCanvas from './SlideCanvas.jsx';
import { backgroundStyle } from '../components/styles.js';
import { useSlides } from '../contexts/Slides.context.jsx';
import { useLabels } from './hooks.js';

const DRAW_MARGIN = "100%";
const CLEAR_MARGIN = "200%";
const FRAME_BUDGET = 8;
const updates = [];
const watchers = new WeakMap();

/** Draws or clears queued thumbnails for a part of each frame only, so many changing at once never block scrolling. */
function runUpdates() {
    const start = performance.now();
    while (updates.length && performance.now()-start<FRAME_BUDGET)
        flushSync(updates.shift());
    if (updates.length)
        requestAnimationFrame(runUpdates);
}

/** Queues the drawing or clearing of a thumbnail, and gives the function taking it out of the queue. */
function queueUpdate(update) {
    updates.push(update);
    if (updates.length===1)
        requestAnimationFrame(runUpdates);
    return () => {
        const index = updates.indexOf(update);
        if (index>=0)
            updates.splice(index, 1);
    };
}

/** Shared pair of observers of a scrolling panel, calling back each thumbnail when it comes near or goes far. */
function watcher(root) {
    if (!watchers.has(root)) {
        const handlers = new Map();
        const notify = (isNear) => (entries) => entries.forEach((entry) => {
            if (entry.isIntersecting===isNear)
                handlers.get(entry.target)?.[isNear ? "onNear" : "onFar"]();
        });
        watchers.set(root, {
            handlers,
            draw: new IntersectionObserver(notify(true), { root, rootMargin: DRAW_MARGIN }),
            clear: new IntersectionObserver(notify(false), { root, rootMargin: CLEAR_MARGIN })
        });
    }
    return watchers.get(root);
}

/** Calls back while a thumbnail comes near the visible part of its panel or goes far from it, and gives the function stopping it. */
function watch(root, target, onNear, onFar) {
    const { handlers, draw, clear } = watcher(root);
    handlers.set(target, { onNear, onFar });
    draw.observe(target);
    clear.observe(target);
    return () => {
        handlers.delete(target);
        draw.unobserve(target);
        clear.unobserve(target);
    };
}

/** Clickable miniature of a slide, with its number and a highlight on the current one, drawn while it is near the visible part of its scrolling panel and cleared once far from it, drawn again only when its own props change. */
function SlideThumbnail({ ref, scrollRoot, slide, number, isCurrent, onSelect }) {
    const { size } = useSlides();
    const text = useLabels();
    const canvasRef = useRef(null);
    const [width, setWidth] = useState(0);
    const [isDrawn, setDrawn] = useState(false);

    useLayoutEffect(() => {
        const canvas = canvasRef.current;
        const observer = new ResizeObserver(() => flushSync(() => setWidth(canvas.clientWidth)));
        observer.observe(canvas);
        return () => observer.disconnect();
    }, []);

    useEffect(() => {
        let unqueue = () => {};
        const queueDrawn = (isDrawn) => () => {
            unqueue();
            unqueue = queueUpdate(() => setDrawn(isDrawn));
        };
        const unwatch = watch(scrollRoot.current, canvasRef.current, queueDrawn(true), queueDrawn(false));
        return () => {
            unqueue();
            unwatch();
        };
    }, [scrollRoot]);

    const canvas = useMemo(() => (
        <SlideCanvas slide={slide} number={number} scale={width/size.width} />
    ), [slide, number, width, size]);

    return (
        <button
            ref={ref}
            onClick={() => onSelect(number)}
            aria-label={`${text.slide} ${number}`}
            aria-current={isCurrent || undefined}
            className={`group relative w-full shrink-0 overflow-hidden rounded-lg outline-hidden transition-shadow ${isCurrent?"ring-[5px] ring-accent":"ring-2 ring-gray-200 hover:ring-gray-300 focus-visible:ring-gray-400 dark:ring-gray-700 dark:hover:ring-gray-500 dark:focus-visible:ring-gray-400"}`}
            style={{ aspectRatio: `${size.width} / ${size.height}`, ...backgroundStyle(slide.background) }}
        >
            <div ref={canvasRef} inert aria-hidden="true" className="absolute inset-0 pointer-events-none">
                {isDrawn && canvas}
            </div>
            <span className="absolute bottom-1 left-1 rounded-md bg-white/90 px-1.5 text-xs font-semibold text-gray-600 ring-1 ring-gray-200 tabular-nums dark:bg-gray-900/90 dark:text-gray-300 dark:ring-gray-700 transition-opacity duration-200 group-hover:opacity-0 group-focus-visible:opacity-0">
                {number}
            </span>
            <span className="absolute inset-0 flex items-center justify-center bg-gray-500/50 text-4xl font-bold text-white/90 tabular-nums opacity-0 transition-opacity duration-200 group-hover:opacity-100 group-focus-visible:opacity-100">
                {number}
            </span>
        </button>
    );
}

export default memo(SlideThumbnail);
