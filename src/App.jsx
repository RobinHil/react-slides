import { Toolbar, SlideViewer, SlideLoader, ExitFullScreenButton, Mosaic } from './interface/index.jsx';
import { SlidesCountProvider } from './contexts/SlidesCount.context.jsx';
import { useMosaic } from './contexts/Mosaic.context.jsx';
import slides from './slides/index.jsx';

function App() {
    const { isVisible } = useMosaic();

    return (
        <SlidesCountProvider max={slides.length}>
            <div className={`flex flex-col h-screen ${isVisible?"ml-32":""}`}>
                <Toolbar />
                <SlideViewer>
                    <SlideLoader slides={slides} />
                </SlideViewer>
                <ExitFullScreenButton />
                <Mosaic />
            </div>
        </SlidesCountProvider>
    );
}

export default App;
