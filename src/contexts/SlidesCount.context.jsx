import { createContext, useContext, useState } from 'react';

const SlidesCountContext = createContext(null);

function useSlidesCount() {
    return useContext(SlidesCountContext);
}

function SlidesCountProvider({ children, max=1 }) {
    const [count, setCount] = useState(1);
    const [maxSlide, setMaxSlide] = useState(max);

    const changeSlidesCount = (value) => {
        if (!isNaN(value)) {
            if (value>maxSlide)
                setCount(maxSlide);
            else if (value<1)
                setCount(1);
            else
                setCount(value);
        }
    };

    const decrementSlidesCount = () => {
        setCount(count-1<1?1:count-1);
    };

    const incrementSlidesCount = () => {
        setCount(count+1>maxSlide?maxSlide:count+1);
    };

    const firstSlidesCount = () => {
        setCount(1);
    };

    const lastSlidesCount = () => {
        setCount(maxSlide);
    };

    return (
        <SlidesCountContext.Provider
            value={{
                count,
                changeSlidesCount,
                decrementSlidesCount,
                incrementSlidesCount,
                firstSlidesCount,
                lastSlidesCount,
                maxSlide,
                setMaxSlide
            }}
        >
            {children}
        </SlidesCountContext.Provider>
    );
}

export { useSlidesCount, SlidesCountProvider };