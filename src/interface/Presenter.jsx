import { useCallback, useEffect, useLayoutEffect, useRef, useState } from 'react';
import { flushSync } from 'react-dom';
import { faMinus, faPause, faPlay, faPlus, faRotateLeft } from '@fortawesome/free-solid-svg-icons';
import SlideCanvas from './SlideCanvas.jsx';
import ToolbarButton from './ToolbarButton.jsx';
import Icon from './Icon.jsx';
import NotesContent from './NotesContent.jsx';
import { formatDuration } from './time.js';
import SlidesNav from './SlidesNav.jsx';
import { useBrowserLanguage, useInterfaceLanguage, useLabels } from './hooks.js';
import { useSlides } from '../contexts/Slides.context.jsx';
import { backgroundStyle } from '../components/styles.js';

const NOTES_ZOOMS = [0.8, 1, 1.25, 1.5, 1.75, 2, 2.5];
const NOTES_ZOOM_KEY = "presenter-notes-zoom";
const PANEL = "rounded-2xl bg-white ring-1 ring-gray-200 dark:bg-gray-900 dark:ring-gray-800";

/** Reads the zoom of the notes chosen last time, the normal one when none was saved. */
function readNotesZoom() {
    try {
        const zoom = Number(localStorage.getItem(NOTES_ZOOM_KEY));
        return NOTES_ZOOMS.includes(zoom) ? zoom : 1;
    } catch {
        return 1;
    }
}

/** Saves the zoom of the notes, silently when the storage is unavailable. */
function storeNotesZoom(zoom) {
    try {
        localStorage.setItem(NOTES_ZOOM_KEY, String(zoom));
    } catch {
        return;
    }
}

/** Timer of the talk, stopped at zero until started, then paused, resumed or reset at will, ticking on its exact seconds. */
function Timer() {
    const text = useLabels();
    const [timer, setTimer] = useState({ elapsed: 0, since: null });
    const [now, setNow] = useState(0);
    const isRunning = timer.since!==null;
    const elapsed = timer.elapsed+(isRunning ? Math.max(now-timer.since, 0) : 0);

    useEffect(() => {
        if (!isRunning)
            return;
        const timeout = setTimeout(() => setNow(Date.now()), 1000-elapsed%1000);
        return () => clearTimeout(timeout);
    }, [isRunning, elapsed]);

    const toggle = () => {
        const at = Date.now();
        setNow(at);
        setTimer(({ elapsed: done, since }) => since===null ? { elapsed: done, since: at } : { elapsed: done+at-since, since: null });
    };

    const reset = () => {
        const at = Date.now();
        setNow(at);
        setTimer(({ since }) => ({ elapsed: 0, since: since===null ? null : at }));
    };

    return (
        <div className="flex items-center gap-1">
            <span className={`px-2 font-mono text-3xl font-semibold tabular-nums ${isRunning?"":"text-gray-500 dark:text-gray-400"}`}>{formatDuration(elapsed)}</span>
            <ToolbarButton icon={<Icon icon={isRunning ? faPause : faPlay} />} label={isRunning ? text.pauseTimer : elapsed>0 ? text.resumeTimer : text.startTimer} onClick={toggle} align="left" />
            <ToolbarButton icon={<Icon icon={faRotateLeft} />} label={text.resetTimer} onClick={reset} align="left" />
        </div>
    );
}

/** Time of day, in the language of the interface, ticking on each new minute. */
function Clock() {
    const language = useBrowserLanguage();
    const [now, setNow] = useState(() => Date.now());

    useEffect(() => {
        const timeout = setTimeout(() => setNow(Date.now()), 60000-now%60000);
        return () => clearTimeout(timeout);
    }, [now]);

    return (
        <span className="justify-self-end px-2 font-mono text-3xl font-semibold tabular-nums">{new Intl.DateTimeFormat(language, { hour: "2-digit", minute: "2-digit" }).format(now)}</span>
    );
}

/** Slide drawn as large as its box allows, in its middle, or nothing when there is none. */
function SlideBox({ slide, number, step, onStepCount, onClick, className="", style }) {
    const { size } = useSlides();
    const boxRef = useRef(null);
    const [scale, setScale] = useState(0);

    useLayoutEffect(() => {
        const box = boxRef.current;
        const observer = new ResizeObserver(() => flushSync(() => setScale(Math.min(box.clientWidth/size.width, box.clientHeight/size.height))));
        observer.observe(box);
        return () => observer.disconnect();
    }, [size]);

    return (
        <div ref={boxRef} onClick={onClick} className={`relative min-h-0 min-w-0 flex items-center justify-center ${className}`} style={style}>
            {scale>0 && slide && (
                <div className="relative overflow-hidden rounded-lg shadow-lg ring-1 ring-gray-200 dark:ring-gray-700 dark:shadow-black/50" style={{ width: size.width*scale, height: size.height*scale, ...backgroundStyle(slide.background) }}>
                    <SlideCanvas key={number} slide={slide} number={number} scale={scale} step={step} onStepCount={onStepCount} />
                </div>
            )}
        </div>
    );
}

/** View of the presenter, in a window of its own: the current slide, what comes next, the notes, a timer and the time of day, moving the audience window along. */
function Presenter({ accentColor }) {
    const { slides, slide, size, current, total, step, stepCount, setStepCount, next } = useSlides();
    const language = useInterfaceLanguage();
    const text = useLabels();
    const [notesZoom, setNotesZoom] = useState(readNotesZoom);
    const notesRef = useRef(null);
    const countSteps = useCallback((count) => setStepCount(current, count), [setStepCount, current]);
    const shown = Math.min(step, stepCount);
    const isNextStep = shown<stepCount;
    const ratio = { aspectRatio: `${size.width} / ${size.height}` };

    useEffect(() => {
        const title = document.title;
        document.title = `${text.presenter} · ${title}`;
        return () => {
            document.title = title;
        };
    }, [text.presenter]);

    useEffect(() => {
        notesRef.current.scrollTop = 0;
    }, [current]);

    useEffect(() => {
        storeNotesZoom(notesZoom);
    }, [notesZoom]);

    const zoomNotes = (direction) => {
        setNotesZoom((zoom) => NOTES_ZOOMS[Math.min(Math.max(NOTES_ZOOMS.indexOf(zoom)+direction, 0), NOTES_ZOOMS.length-1)]);
    };

    return (
        <div lang={language} style={{ "--accent": accentColor }} className="h-dvh flex flex-col gap-3 p-3 sm:gap-4 sm:p-4 bg-gray-100 text-gray-800 dark:bg-gray-950 dark:text-gray-100">
            <header className={`${PANEL} @container grid grid-cols-[1fr_auto_1fr] items-center gap-4 px-3 py-2`}>
                <Timer />
                <SlidesNav />
                <Clock />
            </header>
            <main className="grow min-h-0 grid grid-cols-[3fr_2fr] gap-3 sm:gap-4">
                <SlideBox slide={slide} number={current} step={step} onStepCount={countSteps} onClick={next} className="cursor-pointer" />
                <aside className="min-h-0 flex flex-col gap-3 sm:gap-4">
                    <section className={`${PANEL} p-3`}>
                        <h2 className="mb-2 text-xs font-semibold uppercase tracking-wide text-gray-500 dark:text-gray-400">{isNextStep ? text.nextStepPreview : text.nextSlidePreview}</h2>
                        {isNextStep || current<total ? (
                            <SlideBox
                                slide={isNextStep ? slide : slides[current]}
                                number={isNextStep ? current : current+1}
                                step={isNextStep ? shown+1 : 0}
                                style={ratio}
                            />
                        ) : (
                            <p style={ratio} className="flex items-center justify-center rounded-lg bg-gray-100 text-gray-500 dark:bg-gray-800 dark:text-gray-400">{text.endOfDeck}</p>
                        )}
                    </section>
                    <section className={`${PANEL} grow min-h-0 flex flex-col`}>
                        <div className="flex items-center justify-between gap-2 border-b border-gray-100 px-3 py-1.5 dark:border-gray-800">
                            <h2 className="px-2 text-xs font-semibold uppercase tracking-wide text-gray-500 dark:text-gray-400">{text.notes}</h2>
                            <div className="flex">
                                <ToolbarButton icon={<Icon icon={faMinus} />} label={text.smallerNotes} onClick={() => zoomNotes(-1)} align="right" />
                                <ToolbarButton icon={<Icon icon={faPlus} />} label={text.largerNotes} onClick={() => zoomNotes(1)} align="right" />
                            </div>
                        </div>
                        <div ref={notesRef} className="grow min-h-0 overflow-y-auto px-5 py-4 text-base leading-relaxed text-gray-700 dark:text-gray-300 wrap-break-word">
                            <div style={{ zoom: notesZoom }}>
                                <NotesContent notes={slide.notes} />
                            </div>
                        </div>
                    </section>
                </aside>
            </main>
        </div>
    );
}

export default Presenter;
