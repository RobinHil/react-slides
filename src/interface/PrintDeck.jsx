import { Suspense, useCallback, useLayoutEffect, useRef, useState } from 'react';
import SlideCanvas from './SlideCanvas.jsx';
import { backgroundStyle } from '../components/styles.js';
import { useSlides } from '../contexts/Slides.context.jsx';
import { usePrint, PrintedContext } from '../contexts/Print.context.jsx';
import { shadowLayers, sharpen } from './print.js';

/** Waits for a frame to be drawn, or a moment when the page is hidden and draws none. */
function nextFrame() {
    return new Promise((resolve) => {
        requestAnimationFrame(resolve);
        setTimeout(resolve, 100);
    });
}

/** Replaces the blurred shadows of an element and its descendants by sharp layered ones. */
function sharpenShadows(element) {
    for (const node of [element, ...element.querySelectorAll("*")]) {
        const shadow = getComputedStyle(node).boxShadow;
        if (shadow!=="none")
            node.style.boxShadow = shadowLayers(shadow).flatMap(sharpen).join(", ");
    }
}

/** Waits until the fonts and the images of the referenced element are loaded, its shadows sharpened, and the slides refitted. */
async function settle(ref) {
    await nextFrame();
    sharpenShadows(ref.current);
    await document.fonts.ready;
    await Promise.all([...ref.current.querySelectorAll("img")].map((image) => image.decode().catch(() => null)));
    await nextFrame();
    await nextFrame();
}

/** Calls back once the content around it, suspended until then, is all shown. */
function Ready({ onReady }) {
    useLayoutEffect(() => {
        onReady();
    }, [onReady]);

    return null;
}

/** Pages of the deck, one per slide or one per step, counting the steps of each slide on a first pass when needed. */
function PrintPages() {
    const { slides, size } = useSlides();
    const { markReady, printSteps } = usePrint();
    const deckRef = useRef(null);
    const stepCounts = useRef([]);
    const [pages, setPages] = useState(null);
    const list = pages ?? slides.map((slide, index) => ({ slide, number: index+1, step: Infinity }));

    const handleReady = useCallback(() => {
        if (printSteps && !pages) {
            setPages(slides.flatMap((slide, index) => Array.from({ length: (stepCounts.current[index] ?? 0)+1 }, (_, step) => ({ slide, number: index+1, step }))));
            return;
        }
        settle(deckRef).then(markReady);
    }, [printSteps, pages, slides, markReady]);

    return (
        <div ref={deckRef} aria-hidden="true" className="fixed top-0 left-full invisible pointer-events-none print:static print:visible">
            <style>{`@page { size: ${size.width}px ${size.height}px; margin: 0; }`}</style>
            <PrintedContext value={true}>
                <Suspense>
                    {list.map((page) => (
                        <div key={`${page.number}.${page.step}`} className="relative overflow-hidden break-after-page last:break-after-auto [print-color-adjust:exact]" style={{ width: size.width, height: size.height, ...backgroundStyle(page.slide.background) }}>
                            <SlideCanvas slide={page.slide} number={page.number} scale={1} step={page.step} onStepCount={pages ? undefined : (count) => { stepCounts.current[page.number-1] = count; }} print />
                        </div>
                    ))}
                    <Ready onReady={handleReady} />
                </Suspense>
            </PrintedContext>
        </div>
    );
}

/** Every slide at full size, one per page, laid out out of sight while printing and the only thing printed. */
function PrintDeck() {
    const { isPrinting } = usePrint();
    return isPrinting ? <PrintPages /> : null;
}

export default PrintDeck;
