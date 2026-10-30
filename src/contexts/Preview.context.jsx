import { createContext, use } from 'react';

const PreviewContext = createContext(null);

/** Gives the settings of a deck drawn as a preview card rather than as a presentation, or null when it is presented. */
function usePreview() {
    return use(PreviewContext);
}

export { usePreview, PreviewContext };
