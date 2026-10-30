import { useLayoutEffect, useRef } from 'react';

const MIN_FILL_HEIGHT = 0.1;
const layouts = new WeakMap();

/** Shrinks the content of a slide until it fits, after giving filling images as much height as possible, with a zoom rather than a transform for print, which PDF readers draw faithfully, and reuses the layout found for the same slide elsewhere. */
function SlideFrame({ children, slide, print=false }) {
    const boxRef = useRef(null);

    useLayoutEffect(() => {
        const box = boxRef.current;
        const area = box.parentElement;
        let width = 0;
        let height = 0;
        let fillHeight = null;

        /** Scales the content and widens its box so the scaled result covers the whole area. */
        function apply(scale) {
            box.style.width = `${width/scale}px`;
            box.style.height = `${height/scale}px`;
            box.style.setProperty("--frame-width", `${width/scale}px`);
            box.style.setProperty("--frame-height", `${height/scale}px`);
            if (print)
                box.style.zoom = scale;
            else
                box.style.transform = `scale(${scale})`;
        }

        /** Sets the height that filling images may take. */
        function applyFillHeight(value) {
            fillHeight = value;
            box.style.setProperty("--fill-height", `${value}px`);
        }

        /** Tells whether the content fits in its box without overflowing. */
        function fits() {
            return box.scrollWidth<=box.clientWidth+1 && box.scrollHeight<=box.clientHeight+1;
        }

        /** Finds by dichotomy the tallest filling images that still let the content fit. */
        function fitImages() {
            if (!box.querySelector("[data-fill]"))
                return;
            applyFillHeight(height);
            if (fits())
                return;
            let low = height*MIN_FILL_HEIGHT, high = height;
            applyFillHeight(low);
            if (!fits())
                return;
            for (let i = 0; i<10; i++) {
                const mid = (low+high)/2;
                applyFillHeight(mid);
                if (fits())
                    low = mid;
                else
                    high = mid;
            }
            applyFillHeight(low);
        }

        /** Finds by dichotomy the largest scale at which the content fits, and gives it. */
        function measure() {
            fillHeight = null;
            apply(1);
            fitImages();
            if (fits())
                return 1;
            let low = 0.1, high = 1;
            for (let i = 0; i<10; i++) {
                const mid = (low+high)/2;
                apply(mid);
                if (fits())
                    low = mid;
                else
                    high = mid;
            }
            apply(low);
            return low;
        }

        /** Applies the layout already found for this slide in an area of the same size, and tells whether it still fits. */
        function reuse() {
            const known = layouts.get(slide);
            if (known?.width!==width || known.height!==height)
                return false;
            if (known.fillHeight!==null)
                applyFillHeight(known.fillHeight);
            apply(known.scale);
            return fits();
        }

        /** Fits the content to the area, reusing the known layout of the slide unless its content has just changed. */
        function fit(hasChanged=false) {
            width = area.clientWidth;
            height = area.clientHeight;
            if (!hasChanged && reuse())
                return;
            const scale = measure();
            layouts.set(slide, { width, height, scale, fillHeight });
        }

        /** Fits the content again after it changed, as when a font or an image has loaded. */
        function refit() {
            fit(true);
        }

        let fontFrame = 0;

        /** Fits the content again once per frame however many fonts have just loaded. */
        function refitAfterFonts() {
            if (!fontFrame)
                fontFrame = requestAnimationFrame(() => {
                    fontFrame = 0;
                    refit();
                });
        }

        fit();

        const resizes = new ResizeObserver(() => fit());
        resizes.observe(area);
        const mutations = new MutationObserver(refit);
        mutations.observe(box, { childList: true, subtree: true, characterData: true });
        box.addEventListener("load", refit, true);
        document.fonts?.addEventListener("loadingdone", refitAfterFonts);

        return () => {
            cancelAnimationFrame(fontFrame);
            resizes.disconnect();
            mutations.disconnect();
            box.removeEventListener("load", refit, true);
            document.fonts?.removeEventListener("loadingdone", refitAfterFonts);
        };
    }, [slide, print]);

    return (
        <div ref={boxRef} className="absolute top-0 left-0 origin-top-left">
            {children}
        </div>
    );
}

export default SlideFrame;
