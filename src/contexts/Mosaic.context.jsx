import { createContext, useContext, useState } from 'react';

const MosaicContext = createContext(null);

function useMosaic() {
    return useContext(MosaicContext);
}

function MosaicProvider({ children }) {
    const [isVisible, setVisible] = useState(false);

    const toggleVisible = () => {
        setVisible(!isVisible);
    };

    return (
        <MosaicContext.Provider
            value={{
                isVisible,
                toggleVisible
            }}
        >
            {children}
        </MosaicContext.Provider>
    );
}

export { useMosaic, MosaicProvider };