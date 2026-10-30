import { createContext, use, useCallback, useEffect, useEffectEvent, useRef, useState } from 'react';
import { flushSync } from 'react-dom';
import { clamp, readHash, writeHash } from './position.js';

const SlidesContext = createContext(null);
const SESSION_PARAM = "presenter";
let transitionCount = 0;
let pageTransition = null;
let caughtPress = false;

/** Tells whether moving to another slide can be animated, in a browser able to and for someone not asking for less motion. */
function canAnimate(transition) {
    return transition!=="none" && Boolean(document.startViewTransition) && !window.matchMedia("(prefers-reduced-motion: reduce)").matches;
}

/** Notes whether a press of the pointer was caught by a transition of the whole page, so that the click it ends in is replayed even once the transition is over. */
function notePress(event) {
    caughtPress = Boolean(pageTransition) && event.target===document.documentElement;
}

/** Replays, once the click it should end in had its chance, a press caught by a transition of the whole page and released on an element, which some browsers then never click. */
function replayCaughtRelease(event) {
    if (!caughtPress || event.target===document.documentElement)
        return;
    const { clientX, clientY, button } = event;
    setTimeout(() => {
        if (!caughtPress)
            return;
        caughtPress = false;
        clickAt(clientX, clientY, button);
    });
}

/** Clicks the element at a point of the page, unless the page itself is there. */
function clickAt(clientX, clientY, button) {
    const target = document.elementFromPoint(clientX, clientY);
    if (target && target!==document.documentElement)
        target.dispatchEvent(new MouseEvent("click", { bubbles: true, cancelable: true, view: window, clientX, clientY, button }));
}

/** Replays on the element under the pointer a click caught by a transition of the whole page, once that transition is skipped. */
function replayCaughtClick(event) {
    const transition = pageTransition;
    const isCaught = event.target===document.documentElement && (Boolean(transition) || caughtPress);
    caughtPress = false;
    if (!isCaught)
        return;
    event.stopPropagation();
    const { clientX, clientY, button } = event;
    if (!transition) {
        clickAt(clientX, clientY, button);
        return;
    }
    transition.skipTransition();
    transition.finished.finally(() => clickAt(clientX, clientY, button));
}

/** Gives the slides of the deck, their size and language, the current slide and step, the functions moving between them, the element their transitions are drawn in, and the function joining or leaving the session of a talk. */
function useSlides() {
    const context = use(SlidesContext);
    if (!context)
        throw new Error("useSlides must be used inside a SlidesProvider");
    return context;
}

/** Holds the slides of a deck, which one is shown and at which step, a step past the last one standing for the end of the slide, and keeps the audience and presenter windows of a talk on the same slide. */
function SlidesProvider({ children, slides, size, lang }) {
    const total = slides.length;
    const [position, setPosition] = useState(() => {
        const read = readHash();
        return read ? { slide: clamp(read.slide, total), step: Math.max(read.step, 0) } : { slide: 1, step: 0 };
    });
    const [stepCounts, setStepCounts] = useState({});
    const [session, setSession] = useState(() => new URLSearchParams(location.search).get(SESSION_PARAM) || null);
    const transitionScope = useRef(null);
    const channelRef = useRef(null);
    const sharedRef = useRef(position);
    const targetRef = useRef(position);
    const { slide: current, step } = position;
    const stepCount = stepCounts[current] ?? 0;

    const place = useCallback((target) => {
        targetRef.current = target;
        setPosition(target);
    }, []);

    useEffect(() => {
        writeHash(current, step, stepCount);
        const handleHashChange = () => {
            const read = readHash();
            if (read && (read.slide!==current || read.step!==Math.min(step, stepCount)))
                place({ slide: clamp(read.slide, total), step: Math.max(read.step, 0) });
            else
                writeHash(current, step, stepCount);
        };
        window.addEventListener("hashchange", handleHashChange);
        return () => window.removeEventListener("hashchange", handleHashChange);
    }, [current, step, stepCount, total, place]);

    const setStepCount = useCallback((slide, count) => {
        setStepCounts((counts) => counts[slide]===count ? counts : { ...counts, [slide]: count });
    }, []);

    const goTo = useCallback((slide, toStep=0) => {
        if (!Number.isNaN(slide))
            place({ slide: clamp(slide, total), step: toStep });
    }, [total, place]);

    const moveTo = (target) => {
        const transition = slides[target.slide-1].transition;
        const from = targetRef.current.slide;
        targetRef.current = target;
        if (!transitionScope.current || target.slide===from || !canAnimate(transition)) {
            setPosition(target);
            return;
        }
        const scope = transitionScope.current.startViewTransition ? transitionScope.current : document.documentElement;
        const count = ++transitionCount;
        scope.dataset.transition = transition==="slide" ? `slide-${target.slide>from ? "forward" : "backward"}` : transition;
        const viewTransition = (scope===document.documentElement ? document : scope).startViewTransition(() => flushSync(() => setPosition(target)));
        if (scope===document.documentElement)
            pageTransition = viewTransition;
        viewTransition.ready.catch(() => {});
        viewTransition.finished.finally(() => {
            if (pageTransition===viewTransition)
                pageTransition = null;
            if (count===transitionCount)
                delete scope.dataset.transition;
        });
    };

    useEffect(() => {
        document.addEventListener("pointerdown", notePress, true);
        document.addEventListener("pointerup", replayCaughtRelease, true);
        document.addEventListener("click", replayCaughtClick, true);
        return () => {
            document.removeEventListener("pointerdown", notePress, true);
            document.removeEventListener("pointerup", replayCaughtRelease, true);
            document.removeEventListener("click", replayCaughtClick, true);
        };
    }, []);

    const receive = useEffectEvent((channel, message) => {
        if (message.type==="hello") {
            channel.postMessage({ type: "position", ...sharedRef.current });
            return;
        }
        sharedRef.current = { slide: message.slide, step: message.step };
        moveTo(sharedRef.current);
    });

    useEffect(() => {
        if (!session || !window.BroadcastChannel)
            return;
        const channel = new BroadcastChannel(`react-slides:${session}`);
        channel.onmessage = ({ data }) => receive(channel, data);
        channelRef.current = channel;
        if (new URLSearchParams(location.search).has(SESSION_PARAM))
            channel.postMessage({ type: "hello" });
        return () => {
            channel.close();
            channelRef.current = null;
        };
    }, [session]);

    useEffect(() => {
        const shared = sharedRef.current;
        if (shared.slide===current && shared.step===step)
            return;
        sharedRef.current = { slide: current, step };
        channelRef.current?.postMessage({ type: "position", slide: current, step });
    }, [current, step]);

    const next = () => {
        const { slide: at, step: atStep } = targetRef.current;
        if (atStep<(stepCounts[at] ?? 0))
            moveTo({ slide: at, step: atStep+1 });
        else if (at<total)
            moveTo({ slide: at+1, step: 0 });
    };

    const previous = () => {
        const { slide: at, step: atStep } = targetRef.current;
        const shown = Math.min(atStep, stepCounts[at] ?? 0);
        if (shown>0)
            moveTo({ slide: at, step: shown-1 });
        else if (at>1)
            moveTo({ slide: at-1, step: Infinity });
    };

    return (
        <SlidesContext
            value={{
                slides,
                size,
                lang,
                slide: slides[current-1],
                current,
                total,
                step,
                stepCount,
                setStepCount,
                transitionScope,
                setSession,
                goTo,
                next,
                previous,
                first: () => goTo(1),
                last: () => goTo(total)
            }}
        >
            {children}
        </SlidesContext>
    );
}

/** Holds the slides of a deck shown still, at its first slide and with every step, as in a preview. */
function StillSlidesProvider({ children, slides, size, lang }) {
    const stay = () => {};

    return (
        <SlidesContext
            value={{ slides, size, lang, slide: slides[0], current: 1, total: slides.length, step: Infinity, stepCount: 0, setStepCount: stay, goTo: stay, next: stay, previous: stay, first: stay, last: stay }}
        >
            {children}
        </SlidesContext>
    );
}

export { useSlides, SlidesProvider, StillSlidesProvider };
