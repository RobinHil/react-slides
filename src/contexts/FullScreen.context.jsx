import { createContext, useContext, useState } from 'react';

const FullScreenContext = createContext(null);

function useFullScreen() {
    return useContext(FullScreenContext);
}

function FullScreenProvider({ children }) {
    const [isFullScreen, setFullScreen] = useState(false);

    const toggleFullScreen = () => {
        setFullScreen(!isFullScreen);
    };

    return (
        <FullScreenContext.Provider
            value={{
                isFullScreen,
                toggleFullScreen
            }}
        >
            {children}
        </FullScreenContext.Provider>
    );
}

export { useFullScreen, FullScreenProvider };