import { createContext, use, useCallback, useState } from 'react';

const PanelsContext = createContext(null);

/** Gives the visibility of the slide list, the mosaic, the notes panel, the progress bar and the help, with their toggles, and the shortcuts the help lists. */
function usePanels() {
    const context = use(PanelsContext);
    if (!context)
        throw new Error("usePanels must be used inside a PanelsProvider");
    return context;
}

/** Holds which panels around the slide are shown. */
function PanelsProvider({ children }) {
    const [isSlideListVisible, setSlideListVisible] = useState(false);
    const [isMosaicVisible, setMosaicVisible] = useState(false);
    const [isNotesVisible, setNotesVisible] = useState(false);
    const [isProgressVisible, setProgressVisible] = useState(true);
    const [helpKeys, setHelpKeys] = useState(null);
    const toggleSlideList = useCallback(() => setSlideListVisible((isVisible) => !isVisible), []);
    const toggleMosaic = useCallback(() => setMosaicVisible((isVisible) => !isVisible), []);
    const toggleNotes = useCallback(() => setNotesVisible((isVisible) => !isVisible), []);
    const toggleProgress = useCallback(() => setProgressVisible((isVisible) => !isVisible), []);
    const toggleHelp = useCallback((keys) => setHelpKeys((shown) => shown===null ? [keys ?? []].flat() : null), []);

    return (
        <PanelsContext
            value={{
                isSlideListVisible,
                toggleSlideList,
                isMosaicVisible,
                toggleMosaic,
                isNotesVisible,
                toggleNotes,
                isProgressVisible,
                toggleProgress,
                isHelpVisible: helpKeys!==null,
                helpKeys: helpKeys ?? [],
                toggleHelp
            }}
        >
            {children}
        </PanelsContext>
    );
}

export { usePanels, PanelsProvider };
