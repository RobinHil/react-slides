import { createContext, use, useEffect, useState } from 'react';

const FullScreenContext = createContext(null);

/** Gives the full screen state, the toolbar visibility in full screen and their toggles. */
function useFullScreen() {
    const context = use(FullScreenContext);
    if (!context)
        throw new Error("useFullScreen must be used inside a FullScreenProvider");
    return context;
}

/** Holds the full screen state, falling back to a simulated full screen where the API is missing. */
function FullScreenProvider({ children }) {
    const [isFullScreen, setFullScreen] = useState(false);
    const [isToolbarVisible, setToolbarVisible] = useState(false);

    useEffect(() => {
        const handleChange = () => {
            setFullScreen(Boolean(document.fullscreenElement));
            setToolbarVisible(false);
        };
        document.addEventListener("fullscreenchange", handleChange);
        return () => document.removeEventListener("fullscreenchange", handleChange);
    }, []);

    useEffect(() => {
        if (!isFullScreen)
            return;
        const handleKeyDown = (event) => {
            if (event.key==="Escape" && !document.fullscreenElement)
                setFullScreen(false);
        };
        window.addEventListener("keydown", handleKeyDown);
        return () => window.removeEventListener("keydown", handleKeyDown);
    }, [isFullScreen]);

    const toggleToolbar = () => {
        setToolbarVisible((isVisible) => !isVisible);
    };

    const toggleFullScreen = () => {
        setToolbarVisible(false);
        if (isFullScreen) {
            if (document.fullscreenElement)
                document.exitFullscreen().catch(() => setFullScreen(false));
            else
                setFullScreen(false);
            return;
        }
        if (document.fullscreenEnabled)
            document.documentElement.requestFullscreen().catch(() => setFullScreen(true));
        else
            setFullScreen(true);
    };

    return (
        <FullScreenContext
            value={{
                isFullScreen,
                toggleFullScreen,
                isToolbarVisible,
                toggleToolbar
            }}
        >
            {children}
        </FullScreenContext>
    );
}

export { useFullScreen, FullScreenProvider };
