import { useState } from 'react';
import SlidesNav from './SlidesNav.jsx';
import ProgressButton from './ProgressButton.jsx';
import FullScreenButton from './FullScreenButton.jsx';
import PrintButton from './PrintButton.jsx';
import HomeButton from './HomeButton.jsx';
import HelpButton from './HelpButton.jsx';
import PresenterButton from './PresenterButton.jsx';
import SlideListButton from './SlideListButton.jsx';
import MosaicButton from './MosaicButton.jsx';
import NotesButton from './NotesButton.jsx';
import { useMediaQuery } from './hooks.js';
import { useFullScreen } from '../contexts/FullScreen.context.jsx';
import { useSlides } from '../contexts/Slides.context.jsx';
import { useHome } from '../contexts/Home.context.jsx';

/** Thin line setting a group of buttons apart. */
function Separator({ className="block" }) {
    return <span aria-hidden="true" className={`mx-1 h-6 w-px shrink-0 self-center bg-gray-200 dark:bg-gray-700 ${className}`} />;
}

/** Bar holding every control, what is shown on the left and what is done on the right, the way home and the help at its ends, its navigation always in the middle and its buttons shown as its own width allows, which keeps in full screen only what presenting needs and hides until the mouse at the edges or a tap on the top band reveals it. */
function Toolbar({ ref, isEdgeRevealed }) {
    const { isFullScreen, isToolbarVisible } = useFullScreen();
    const { size } = useSlides();
    const home = useHome();
    const [isEditing, setEditing] = useState(false);
    const hasHover = useMediaQuery("(hover: hover)");
    const isHoverMode = isFullScreen && hasHover;
    const isRevealed = (hasHover ? isEdgeRevealed : isToolbarVisible) || isEditing;

    return (
        <div ref={ref} onFocus={(event) => setEditing(event.target.tagName==="INPUT")} onBlur={() => setEditing(false)} className={`flow-root px-2 sm:px-4 short:px-2 phone:order-last ${isFullScreen?`fixed top-0 left-0 right-0 z-30 phone:top-auto phone:bottom-0 transition duration-500 ease-fluid ${isRevealed?"translate-y-0 opacity-100":"-translate-y-full phone:translate-y-full opacity-0"}`:""}`}>
            <div
                className="mx-auto my-2 sm:my-4 short:my-2 p-1 sm:p-3 short:p-1 bg-white shadow-lg max-w-(--toolbar-width) short:max-w-none @container rounded-full grid grid-cols-[minmax(max-content,1fr)_auto_minmax(max-content,1fr)] items-center gap-1 relative border border-gray-200 dark:bg-gray-900 dark:border-gray-700 dark:shadow-black/50"
                style={{ "--toolbar-width": `calc(var(--slide-scale) * ${size.width}px)` }}
            >
                <div className="flex justify-self-start gap-0.5 sm:gap-1">
                    {home && !isFullScreen && <HomeButton />}
                    {home && !isFullScreen && <Separator className="hidden @min-[510px]:block" />}
                    <SlideListButton className={isHoverMode ? "hidden" : "hidden @min-[610px]:inline-flex"} />
                    {!isFullScreen && <MosaicButton />}
                    {!isFullScreen && <NotesButton className="hidden @min-[610px]:inline-flex" />}
                    <ProgressButton className="hidden @min-[800px]:inline-flex" />
                </div>
                <SlidesNav />
                <div className="flex justify-self-end gap-0.5 sm:gap-1">
                    {!isFullScreen && <PrintButton />}
                    {!isFullScreen && <Separator className="hidden @min-[510px]:block" />}
                    {!isFullScreen && <PresenterButton className="hidden @min-[800px]:any-pointer-fine:inline-flex" />}
                    <FullScreenButton />
                    <Separator className="hidden @min-[510px]:any-pointer-fine:block" />
                    <HelpButton className="hidden @min-[510px]:any-pointer-fine:inline-flex" />
                </div>
            </div>
        </div>
    );
}

export default Toolbar;
