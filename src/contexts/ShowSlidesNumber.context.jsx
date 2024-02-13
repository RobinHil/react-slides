import { createContext, useContext, useState } from 'react';

const ShowSlidesNumberContext = createContext(null);

function useShowSlidesNumber() {
    return useContext(ShowSlidesNumberContext);
}

function ShowSlidesNumberProvider({ children }) {
    const [isVisible, setVisible] = useState(true);

    const handleClick = () => {
        setVisible(!isVisible);
    };

    return (
        <ShowSlidesNumberContext.Provider
            value={{
                isVisible,
                handleClick
            }}
        >
            {children}
        </ShowSlidesNumberContext.Provider>
    );
}

export { useShowSlidesNumber, ShowSlidesNumberProvider };