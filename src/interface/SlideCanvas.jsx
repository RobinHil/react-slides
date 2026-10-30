import { Suspense } from 'react';
import SlideFrame from './SlideFrame.jsx';
import SlideCorner from './SlideCorner.jsx';
import SlideBoundary from './SlideBoundary.jsx';
import { backgroundStyle, fontStyle, textStyle } from '../components/styles.js';
import { useSlides } from '../contexts/Slides.context.jsx';
import { StepsProvider } from '../contexts/Steps.context.jsx';
import { SlideThemeContext } from '../contexts/SlideTheme.context.jsx';
import { LiveSlideContext } from '../contexts/LiveSlide.context.jsx';

const PADDING = "40px 48px";

/** Draws a slide at its reference size with its corners, scaled to the given factor and shown up to a step, live when it is the one presented, or for print, where it waits for the Suspense around it. */
function SlideCanvas({ slide, number, scale, step, onStepCount, live=false, print=false }) {
    const { size, lang, total } = useSlides();
    const { content, background, font, headingFont, color, codeTheme, diagramTheme, corners } = slide;
    const hasHeader = corners.topLeft!=null || corners.topRight!=null;
    const hasFooter = corners.bottomLeft!=null || corners.bottomRight!=null;

    return (
        <div
            lang={lang}
            className="absolute top-0 left-0 origin-top-left flex flex-col"
            style={{ width: size.width, height: size.height, "--frame-width": `${size.width}px`, "--frame-height": `${size.height}px`, padding: PADDING, transform: `scale(${scale})`, "--heading-font": fontStyle(headingFont).fontFamily, ...textStyle(color), ...backgroundStyle(background), ...fontStyle(font) }}
        >
            {hasHeader && (
                <div className="flex justify-between items-center gap-8 pb-7">
                    <SlideCorner value={corners.topLeft} number={number} total={total} />
                    <SlideCorner value={corners.topRight} number={number} total={total} align="right" />
                </div>
            )}
            <div className="relative flex-1 min-h-0">
                <SlideFrame slide={slide} print={print}>
                    <SlideBoundary number={number}>
                        <SlideThemeContext value={{ codeTheme, diagramTheme, font }}>
                            <LiveSlideContext value={live}>
                                <StepsProvider step={step} onCount={onStepCount}>
                                    {print ? content : <Suspense>{content}</Suspense>}
                                </StepsProvider>
                            </LiveSlideContext>
                        </SlideThemeContext>
                    </SlideBoundary>
                </SlideFrame>
            </div>
            {hasFooter && (
                <div className="flex justify-between items-center gap-8 pt-7">
                    <SlideCorner value={corners.bottomLeft} number={number} total={total} />
                    <SlideCorner value={corners.bottomRight} number={number} total={total} align="right" />
                </div>
            )}
        </div>
    );
}

export default SlideCanvas;
