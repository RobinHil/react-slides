import { lazy, Suspense, useCallback, useEffect, useLayoutEffect, useRef, useState } from 'react';
import Toolbar from './Toolbar.jsx';
import SlideViewer from './SlideViewer.jsx';
import ProgressBar from './ProgressBar.jsx';
import SlideList from './SlideList.jsx';
import PrintDeck from './PrintDeck.jsx';
import Mosaic from './Mosaic.jsx';
import Help from './Help.jsx';
import { useInterfaceLanguage, useMediaQuery, useRevealZone, useWhenIdle } from './hooks.js';
import { usePanels } from '../contexts/Panels.context.jsx';
import { useFullScreen } from '../contexts/FullScreen.context.jsx';

const NotesPanel = lazy(() => import('./NotesPanel.jsx'));

const SLIDE_LIST_WIDTH = 208;
const NOTES_WIDTH = 320;
const PANEL_MARGIN = 16;
const SLIDE_LIST_SPACE = SLIDE_LIST_WIDTH+PANEL_MARGIN;
const NOTES_SPACE = NOTES_WIDTH+PANEL_MARGIN;

/** Lays out the toolbar, the current slide, the side panels, the progress bar and the help, revealing in full screen the toolbar and the slide list together when the mouse reaches the top or the left band, and loading the notes and the Markdown renderer once the browser is idle. */
function Layout({ accentColor }) {
    const { isSlideListVisible, isNotesVisible } = usePanels();
    const { isFullScreen } = useFullScreen();
    const language = useInterfaceLanguage();
    const stageRef = useRef(null);
    const toolbarRef = useRef(null);
    const [toolbarHeight, setToolbarHeight] = useState(0);
    const hasHover = useMediaQuery("(hover: hover)");
    const isInEdge = useCallback((toolbar, x, y) => y<=toolbar.offsetHeight || x<=SLIDE_LIST_SPACE, []);
    const isEdgeRevealed = useRevealZone(toolbarRef, isInEdge, isFullScreen && hasHover);
    const isIdle = useWhenIdle(false);
    const isNotesReady = useWhenIdle(isNotesVisible);

    useLayoutEffect(() => {
        const toolbar = toolbarRef.current;
        const observer = new ResizeObserver(() => setToolbarHeight(toolbar.offsetHeight));
        observer.observe(toolbar);
        return () => observer.disconnect();
    }, []);

    useEffect(() => {
        if (isIdle)
            import('../components/Markdown.jsx');
    }, [isIdle]);

    return (
        <>
            <div lang={language} className="flex flex-col h-dvh overflow-hidden bg-white dark:bg-gray-950 transition-colors duration-300 print:hidden" style={{ "--accent": accentColor, "--slide-list-space": `${SLIDE_LIST_SPACE}px`, "--notes-space": `${NOTES_SPACE}px` }}>
                <div className="relative grow min-h-0">
                    <div ref={stageRef} className={`flex flex-col h-full transition-[margin] duration-500 ease-fluid ${isSlideListVisible&&!isFullScreen?"lg:ml-(--slide-list-space)":""} ${isNotesVisible&&!isFullScreen?"xl:mr-(--notes-space)":""}`}>
                        <Toolbar ref={toolbarRef} isEdgeRevealed={isEdgeRevealed} />
                        <SlideViewer scaleTarget={stageRef} />
                    </div>
                    <SlideList width={SLIDE_LIST_WIDTH} isEdgeRevealed={isEdgeRevealed} top={toolbarHeight} />
                    {isNotesReady && (
                        <Suspense>
                            <NotesPanel width={NOTES_WIDTH} />
                        </Suspense>
                    )}
                </div>
                <ProgressBar />
                <Mosaic />
                <Help />
            </div>
            <PrintDeck />
        </>
    );
}

export default Layout;
