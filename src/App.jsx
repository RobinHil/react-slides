import React from 'react';
import Toolbar from './components/interface/Toolbar.jsx';
import SlideViewer from './components/interface/SlideViewer.jsx';
import { SlidesCountProvider, useSlidesCount } from './contexts/SlidesCount.context.jsx';
import { ShowSlidesNumberProvider } from './contexts/ShowSlidesNumber.context.jsx';
import ExitFullScreenButton from './components/interface/ExitFullScreenButton.jsx';
import { FullScreenProvider } from './contexts/FullScreen.context.jsx';

// Liste des chemins des fichiers de slide
const slidePaths = [
    "Slide1",
    "Slide2"
];

function App() {
    return (
        <SlidesCountProvider max={slidePaths.length}>
        <ShowSlidesNumberProvider>
            <FullScreenProvider>
            <div className="flex flex-col h-screen">
                <Toolbar />
                <SlideViewer>
                    <SlideLoader slidePaths={slidePaths} />
                </SlideViewer>
                <ExitFullScreenButton />
            </div>
            </FullScreenProvider>
        </ShowSlidesNumberProvider>
        </SlidesCountProvider>
    );
}

// Composant pour charger dynamiquement les slides
function SlideLoader({ slidePaths }) {
    const { count } = useSlidesCount();
    const slideIndex = count - 1;

    // Charger le composant de slide à partir du chemin de fichier correspondant
    const SlideComponent = React.lazy(() => import(`./slides/${slidePaths[slideIndex]}.jsx`));

    return (
        <React.Suspense>
            <SlideComponent />
        </React.Suspense>
    );
}

export default App;
