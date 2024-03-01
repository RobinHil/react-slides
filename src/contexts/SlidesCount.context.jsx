import { createContext, useContext, useReducer, useEffect } from 'react';

const SlidesCountContext = createContext(null);

const initialState = {
    count: 1,
    maxSlide: 1,
    isVisible: true,
};

function reducer(state, action) {
    switch (action.type) {
        case "change":
            if (!isNaN(action.payload)) {
                if (action.payload>state.maxSlide)
                    return { ...state, count: state.maxSlide };
                else if (action.payload<1)
                    return { ...state, count: 1 };
                else
                    return { ...state, count: action.payload };
            }
        case "decrement":
            return { ...state, count: state.count-1<1?1:state.count-1 };
        case "increment":
            return { ...state, count: state.count+1>state.maxSlide?state.maxSlide:state.count+1 };
        case "first":
            return { ...state, count: 1 };
        case "last":
            return { ...state, count: state.maxSlide };
        case "toggleVisible":
            return { ...state, isVisible: !state.isVisible };
        default:
            throw new Error("Erreur: action non prise en charge !");
    }
}

function useSlidesCount() {
    return useContext(SlidesCountContext);
}

function SlidesCountProvider({ children, max = 1 }) {
    const [state, dispatch] = useReducer(reducer, { ...initialState, maxSlide: max });

    useEffect(() => {
        function handleKeyDown(event) {
            switch (event.keyCode) {
                case 39:
                    dispatch({ type: "increment" });
                    break;
                case 37:
                    dispatch({ type: "decrement" });
                    break;
                case 38:
                    dispatch({ type: "last" });
                    break;
                case 40:
                    dispatch({ type: "first" });
                    break;
                default:
                    break;
            }
        }

        window.addEventListener("keydown", handleKeyDown);

        return () => {
            window.removeEventListener("keydown", handleKeyDown);
        };
    }, []);

    return (
        <SlidesCountContext.Provider value={{ state, dispatch }}>
            {children}
        </SlidesCountContext.Provider>
    );
}

export { useSlidesCount, SlidesCountProvider };