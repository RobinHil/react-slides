import { createContext, use, useCallback, useLayoutEffect, useRef } from 'react';

const StepsContext = createContext({ refresh: () => {} });

/** Gives the function numbering the steps of the slide again, once one has appeared or gone. */
function useSteps() {
    return use(StepsContext);
}

/** Numbers the steps of a slide in the order of the page, or by their own order, shows those reached, and tells how many there are. */
function StepsProvider({ children, step=Infinity, onCount }) {
    const scopeRef = useRef(null);
    const applyRef = useRef(null);

    const apply = useCallback(() => {
        if (!scopeRef.current)
            return;
        let implicit = 0;
        let count = 0;
        for (const element of scopeRef.current.querySelectorAll("[data-step]")) {
            const order = Number(element.dataset.stepOrder) || ++implicit;
            count = Math.max(count, order);
            element.dataset.shown = String(step>=order);
        }
        onCount?.(count);
    }, [step, onCount]);

    useLayoutEffect(() => {
        applyRef.current = apply;
        apply();
    }, [apply]);

    const refresh = useCallback(() => {
        applyRef.current?.();
    }, []);

    return (
        <StepsContext value={{ refresh }}>
            <div ref={scopeRef} className="contents">
                {children}
            </div>
        </StepsContext>
    );
}

export { useSteps, StepsProvider };
