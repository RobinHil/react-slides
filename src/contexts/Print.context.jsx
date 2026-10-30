import { createContext, use, useCallback, useEffect, useRef, useState } from 'react';
import { flushSync } from 'react-dom';

const PrintContext = createContext(null);
const PrintedContext = createContext(false);

/** Gives whether the deck is being printed and with a page per step, the function printing it, and the one telling it is ready. */
function usePrint() {
    const context = use(PrintContext);
    if (!context)
        throw new Error("usePrint must be used inside a PrintProvider");
    return context;
}

/** Tells whether a component is drawn for print rather than on screen. */
function usePrinted() {
    return use(PrintedContext);
}

/** Holds the printing of the whole deck, from its button, Ctrl+P or the menu of the browser, with a page per slide or per step. */
function PrintProvider({ children, printSteps=false }) {
    const [isPrinting, setPrinting] = useState(false);
    const resolveReady = useRef(null);

    const print = useCallback(() => {
        if (resolveReady.current)
            return;
        new Promise((resolve) => { resolveReady.current = resolve; }).then(() => window.print());
        setPrinting(true);
    }, []);

    const markReady = useCallback(() => {
        resolveReady.current?.();
    }, []);

    useEffect(() => {
        const handleKeyDown = (event) => {
            if ((event.ctrlKey || event.metaKey) && event.key.toLowerCase()==="p") {
                event.preventDefault();
                print();
            }
        };
        const handleBeforePrint = () => flushSync(() => setPrinting(true));
        const handleAfterPrint = () => {
            resolveReady.current = null;
            setPrinting(false);
        };
        window.addEventListener("keydown", handleKeyDown);
        window.addEventListener("beforeprint", handleBeforePrint);
        window.addEventListener("afterprint", handleAfterPrint);
        return () => {
            window.removeEventListener("keydown", handleKeyDown);
            window.removeEventListener("beforeprint", handleBeforePrint);
            window.removeEventListener("afterprint", handleAfterPrint);
        };
    }, [print]);

    return (
        <PrintContext value={{ isPrinting, print, markReady, printSteps }}>
            {children}
        </PrintContext>
    );
}

export { usePrint, usePrinted, PrintedContext, PrintProvider };
