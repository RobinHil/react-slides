import { useEffect, useLayoutEffect, useRef, useState } from 'react';
import { flushSync } from 'react-dom';
import SlideCanvas from './SlideCanvas.jsx';
import { backgroundStyle } from '../components/styles.js';
import { StillSlidesProvider } from '../contexts/Slides.context.jsx';

/** First slide of a deck drawn as large as its card, telling the card how many slides the deck holds and its language. */
function DeckPreview({ slides, size, lang, onRead }) {
    const frameRef = useRef(null);
    const [width, setWidth] = useState(0);

    useLayoutEffect(() => {
        const frame = frameRef.current;
        const observer = new ResizeObserver(() => flushSync(() => setWidth(frame.clientWidth)));
        observer.observe(frame);
        return () => observer.disconnect();
    }, []);

    useEffect(() => {
        onRead?.({ count: slides.length, lang: lang ?? "en" });
    }, [onRead, slides.length, lang]);

    return (
        <StillSlidesProvider slides={slides} size={size} lang={lang}>
            <div ref={frameRef} inert className="relative overflow-hidden" style={{ aspectRatio: `${size.width} / ${size.height}`, ...backgroundStyle(slides[0].background) }}>
                {width>0 && <SlideCanvas slide={slides[0]} number={1} scale={width/size.width} />}
            </div>
        </StillSlidesProvider>
    );
}

export default DeckPreview;
