import { faPersonChalkboard } from '@fortawesome/free-solid-svg-icons';
import ToolbarButton from './ToolbarButton.jsx';
import Icon from './Icon.jsx';
import { useLabels } from './hooks.js';
import { useSlides } from '../contexts/Slides.context.jsx';

const PRESENTER_WINDOW = "react-slides-presenter";
const CLOSE_CHECK = 300;
let stopWatching = () => {};

/** Gives the screens around the browser when it can place windows on them and has been allowed to, or null. */
async function readScreens() {
    if (!window.getScreenDetails)
        return null;
    try {
        return await window.getScreenDetails();
    } catch {
        return null;
    }
}

/** Ends the talk as a whole: leaving full screen closes the presenter view, and closing the presenter view leaves full screen and the session. */
function watchPresenter(presenter, onEnd) {
    stopWatching();

    /** Closes the presenter view once the deck leaves full screen. */
    function handleFullScreenChange() {
        if (!document.fullscreenElement)
            presenter.close();
    }

    /** Leaves full screen once the presenter view is closed. */
    function checkClosed() {
        if (!presenter.closed)
            return;
        stopWatching();
        onEnd();
        if (document.fullscreenElement)
            document.exitFullscreen().catch(() => null);
    }

    const timer = setInterval(checkClosed, CLOSE_CHECK);
    document.addEventListener("fullscreenchange", handleFullScreenChange);
    stopWatching = () => {
        clearInterval(timer);
        document.removeEventListener("fullscreenchange", handleFullScreenChange);
        stopWatching = () => {};
    };
}

/** Sends this window full screen to another screen when there is one, for the audience, opens the presenter view on the screen in use, and ties both together in a session of their own. */
async function present(setSession) {
    const session = crypto.randomUUID?.() ?? Math.random().toString(36).slice(2);
    const url = new URL(location.href);
    url.searchParams.set("presenter", session);
    const screens = await readScreens();
    const here = screens?.currentScreen;
    const audience = screens?.screens.find((screen) => screen!==here);
    if (audience)
        await document.documentElement.requestFullscreen({ screen: audience }).catch(() => null);
    const placement = here ? `left=${here.availLeft},top=${here.availTop},width=${here.availWidth},height=${here.availHeight}` : `width=${Math.round(screen.availWidth*0.8)},height=${Math.round(screen.availHeight*0.8)}`;
    const presenter = window.open(url, PRESENTER_WINDOW, `popup,${placement}`);
    if (!presenter)
        return;
    setSession(session);
    watchPresenter(presenter, () => setSession(null));
}

/** Opens the presenter view, the deck going full screen on the other screen for the audience. */
function PresenterButton({ className="" }) {
    const { setSession } = useSlides();
    const text = useLabels();

    return (
        <ToolbarButton icon={<Icon icon={faPersonChalkboard} />} label={text.presenter} onClick={() => present(setSession)} shortcut="v" className={className} />
    );
}

export default PresenterButton;
