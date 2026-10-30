import { createContext, use } from 'react';

const HomeContext = createContext(null);

/** Gives the address of the home page listing the decks, or null when the site holds a single deck. */
function useHome() {
    return use(HomeContext);
}

export { useHome, HomeContext };
