import { createContext, useContext, useState } from 'react';

const SlidesCountContext = createContext(null);

function useSlidesCount() {
    return useContext(SlidesCountContext);
}

function SlidesCountProvider({ children }) {
    const [count, setCount] = useState(1);
    const [maxSlide, setMaxSlide] = useState(1);

    const handleChange = (value) => {
        if (!isNaN(value)) {
            if (value>maxSlide)
                setCount(maxSlide);
            else if (value<1)
                setCount(1);
            else
                setCount(value);
        }
    };

    const handleDecrement = () => {
        setCount(count-1<1?maxSlide:count-1);
    };

    const handleIncrement = () => {
        setCount(count+1>maxSlide?maxSlide:count+1);
    };

    const handleFirst = () => {
        setCount(1);
    };

    const handleLast = () => {
        setCount(maxSlide);
    };

    return (
        <SlidesCountContext.Provider
            value={{
                count,
                handleChange,
                handleDecrement,
                handleIncrement,
                handleFirst,
                handleLast,
                maxSlide,
                setMaxSlide
            }}
        >
            {children}
        </SlidesCountContext.Provider>
    );
}

export { useSlidesCount, SlidesCountProvider };