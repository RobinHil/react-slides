import { useEffect, useRef } from 'react';
import { useSlides } from '../contexts/Slides.context.jsx';
import { usePanels } from '../contexts/Panels.context.jsx';
import { useFullScreen } from '../contexts/FullScreen.context.jsx';
import { useLabels } from './hooks.js';
import NotesContent, { STRONG_TEXT } from './NotesContent.jsx';

/** Side panel rendering the Markdown notes of the current slide, hidden in full screen. */
function NotesPanel({ width }) {
    const { slide, current, total } = useSlides();
    const { isNotesVisible, toggleNotes } = usePanels();
    const { isFullScreen } = useFullScreen();
    const text = useLabels();
    const bodyRef = useRef(null);
    const isShown = isNotesVisible && !isFullScreen;

    useEffect(() => {
        bodyRef.current.scrollTop = 0;
    }, [current]);

    return (
        <>
            <div
                onClick={toggleNotes}
                className={`fixed inset-0 z-35 bg-black/30 transition-opacity duration-500 ease-fluid xl:hidden ${isShown?"opacity-100":"opacity-0 pointer-events-none"}`}
            />
            <div
                inert={!isShown}
                aria-label={text.notes}
                className={`absolute top-2 bottom-2 right-2 sm:top-4 sm:bottom-4 sm:right-4 z-40 max-w-[calc(100%-1rem)] bg-white rounded-2xl border border-gray-200 shadow-lg dark:bg-gray-900 dark:border-gray-700 dark:shadow-black/50 flex flex-col transition duration-500 ease-fluid ${isShown?"translate-x-0 opacity-100":"translate-x-[calc(100%+2rem)] opacity-0"}`}
                style={{ width }}
            >
                <div className="px-5 pt-4 pb-3 border-b border-gray-100 dark:border-gray-800">
                    <h2 className={`text-base font-bold ${STRONG_TEXT}`}>{text.notes}</h2>
                    <p className="text-xs text-gray-500 dark:text-gray-400 tabular-nums">{text.slide} {current} / {total}</p>
                </div>
                <div ref={bodyRef} className="grow min-h-0 overflow-y-auto px-5 py-4 text-sm leading-relaxed text-gray-700 dark:text-gray-300 wrap-break-word">
                    <NotesContent notes={slide.notes} />
                </div>
            </div>
        </>
    );
}

export default NotesPanel;
