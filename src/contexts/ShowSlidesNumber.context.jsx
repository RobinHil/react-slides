import { createContext, useContext, useState } from 'react';

const ShowSlidesNumberContext = createContext(null);

function useShowSlidesNumber() {
    return useContext(ShowSlidesNumberContext);
}

function ShowSlidesNumberProvider({ children }) {
    const [isVisible, setVisible] = useState(true);

    const toggleVisible = () => {
        setVisible(!isVisible);
    };

    return (
        <ShowSlidesNumberContext.Provider
            value={{
                isVisible,
                toggleVisible
            }}
        >
            {children}
        </ShowSlidesNumberContext.Provider>
    );
}

export { useShowSlidesNumber, ShowSlidesNumberProvider };