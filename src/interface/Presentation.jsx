import { lazy, Suspense } from 'react';
import { FullScreenProvider } from '../contexts/FullScreen.context.jsx';
import { SlidesProvider } from '../contexts/Slides.context.jsx';
import { PanelsProvider } from '../contexts/Panels.context.jsx';
import { PrintProvider } from '../contexts/Print.context.jsx';
import Layout from './Layout.jsx';
import DeckPreview from './DeckPreview.jsx';
import { usePreview } from '../contexts/Preview.context.jsx';
import themes from '../components/themes.js';
import { Slide, given, layer, readSlides } from './slides.js';

const DEFAULT_SIZE = { width: 1920, height: 1080 };
const DEFAULTS = { ...themes.light, transition: "fade", corners: {} };
const IS_PRESENTER = new URLSearchParams(location.search).has("presenter");

const Presenter = lazy(() => import('./Presenter.jsx'));

/** Whole presentation, made of its slides and of the settings they share, from its theme and its own props, or its preview card on the home page, or its presenter view in the window opened for it. */
function Presentation({ children, theme={}, size=DEFAULT_SIZE, lang, printSteps=false, ...settings }) {
    const preview = usePreview();
    const deck = layer(DEFAULTS, theme, given(settings));
    const slides = readSlides(children, deck);
    const { accentColor } = deck;

    if (preview)
        return <DeckPreview slides={slides} size={size} lang={lang} onRead={preview.onRead} />;

    return (
        <FullScreenProvider>
            <SlidesProvider slides={slides} size={size} lang={lang}>
                {IS_PRESENTER ? (
                    <Suspense>
                        <Presenter accentColor={accentColor} />
                    </Suspense>
                ) : (
                    <PanelsProvider>
                        <PrintProvider printSteps={printSteps}>
                            <Layout accentColor={accentColor} />
                        </PrintProvider>
                    </PanelsProvider>
                )}
            </SlidesProvider>
        </FullScreenProvider>
    );
}

export { Presentation, Slide };
