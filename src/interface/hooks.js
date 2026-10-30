import { useCallback, useEffect, useEffectEvent, useLayoutEffect, useMemo, useState, useSyncExternalStore } from 'react';
import { labels, browserLanguage } from './labels.js';

/** Tells whether a key event comes from a field the user is typing in. */
function isTyping(target) {
    return Boolean(target.closest?.("input, textarea, select, [contenteditable='true']"));
}

/** Tells whether a key event matches a shortcut, given as a key name, a pattern or a list of them. */
function matchesKey(key, event) {
    if (Array.isArray(key))
        return key.some((one) => matchesKey(one, event));
    if (key instanceof RegExp)
        return key.test(event.key);
    return event.key.toLowerCase()===key.toLowerCase();
}

/** Tells whether an element is shown, even out of sight in a hidden bar, rather than left out of the layout. */
function isShown(element) {
    return Boolean(element) && (element.checkVisibility ? element.checkVisibility() : element.getClientRects().length>0);
}

/** Lists the keys of the shortcuts whose control is shown, in lower case. */
function shownShortcuts() {
    return [...document.querySelectorAll("[aria-keyshortcuts]")].filter(isShown).flatMap((element) => element.getAttribute("aria-keyshortcuts").toLowerCase().split(" "));
}

/** Calls the handler when the shortcut key is pressed outside of a text field, and only while the referenced control is shown: no control, no shortcut. */
function useShortcut(key, handler, targetRef) {
    const onKeyDown = useEffectEvent((event) => {
        if (key && matchesKey(key, event) && isShown(targetRef.current))
            handler(event);
    });

    useEffect(() => {
        const handleKeyDown = (event) => {
            if (event.ctrlKey || event.metaKey || event.altKey || isTyping(event.target))
                return;
            if (event.repeat && !event.key.startsWith("Arrow"))
                return;
            onKeyDown(event);
        };
        window.addEventListener("keydown", handleKeyDown);
        return () => window.removeEventListener("keydown", handleKeyDown);
    }, []);
}

/** Tells whether the mouse is inside the zone that reveals an element, following the mouse only while enabled, and never once it has left the window. */
function useRevealZone(ref, isInZone, isEnabled) {
    const [isRevealed, setRevealed] = useState(false);

    useEffect(() => {
        if (!isEnabled)
            return;
        const root = document.documentElement;
        const handleMouseMove = (event) => {
            setRevealed(isInZone(ref.current, event.clientX, event.clientY));
        };
        const handleMouseLeave = () => {
            setRevealed(false);
        };
        window.addEventListener("mousemove", handleMouseMove);
        root.addEventListener("mouseleave", handleMouseLeave);
        return () => {
            window.removeEventListener("mousemove", handleMouseMove);
            root.removeEventListener("mouseleave", handleMouseLeave);
        };
    }, [ref, isInZone, isEnabled]);

    return isEnabled && isRevealed;
}

/** Turns true once the browser is idle after loading, or as soon as the panel is shown, so its content is ready before it opens. */
function useWhenIdle(isShown) {
    const [isIdle, setIdle] = useState(false);

    useEffect(() => {
        if (!window.requestIdleCallback) {
            const timeout = setTimeout(() => setIdle(true), 500);
            return () => clearTimeout(timeout);
        }
        const id = requestIdleCallback(() => setIdle(true), { timeout: 2000 });
        return () => cancelIdleCallback(id);
    }, []);

    return isIdle || isShown;
}

/** Follows a CSS media query, and updates as soon as its result changes. */
function useMediaQuery(query) {
    const subscribe = useCallback((onChange) => {
        const media = window.matchMedia(query);
        media.addEventListener("change", onChange);
        return () => media.removeEventListener("change", onChange);
    }, [query]);

    return useSyncExternalStore(subscribe, () => window.matchMedia(query).matches);
}

/** Tells whether the screen is at least as wide as a Tailwind breakpoint, such as "lg". */
function useBreakpoint(name) {
    const width = useMemo(() => getComputedStyle(document.documentElement).getPropertyValue(`--breakpoint-${name}`), [name]);
    return useMediaQuery(`(min-width: ${width})`);
}

/** Follows the language of the interface for the browser, and updates when the browser languages change. */
function useBrowserLanguage() {
    const subscribe = useCallback((onChange) => {
        window.addEventListener("languagechange", onChange);
        return () => window.removeEventListener("languagechange", onChange);
    }, []);

    return useSyncExternalStore(subscribe, browserLanguage);
}

/** Gives the language of the interface, that of the browser, and marks the page with it, the slides keeping the language of their deck. */
function useInterfaceLanguage() {
    const language = useBrowserLanguage();

    useLayoutEffect(() => {
        document.documentElement.lang = language;
    }, [language]);

    return language;
}

/** Gives the labels of the interface in the language of the browser. */
function useLabels() {
    return labels[useBrowserLanguage()];
}

export { useShortcut, shownShortcuts, useRevealZone, useWhenIdle, useMediaQuery, useBreakpoint, useBrowserLanguage, useInterfaceLanguage, useLabels };
