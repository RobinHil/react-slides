import Toolbar from './interface/Toolbar.jsx';
import SlideViewer from './interface/SlideViewer.jsx';
import { SlidesCountProvider, useSlidesCount } from './contexts/SlidesCount.context.jsx';
import ExitFullScreenButton from './interface/ExitFullScreenButton.jsx';
import { FullScreenProvider } from './contexts/FullScreen.context.jsx';
import SlideLoader from './interface/SlideLoader.jsx';
import slides from './slides/index.jsx';
import SlideMosaic from './interface/SlideMosaic.jsx';
import { MosaicProvider } from './contexts/Mosaic.context.jsx';
import { useMosaic } from './contexts/Mosaic.context.jsx';

function App() {
  return (
    <SlidesCountProvider max={slides.length}>
      <FullScreenProvider>
        <MosaicProvider>
          <AppContent />
        </MosaicProvider>
      </FullScreenProvider>
    </SlidesCountProvider>
  );
}

function AppContent() {
  const { isVisible } = useMosaic();

  return (
    <div className={`flex flex-col h-screen ${isVisible ? 'ml-32' : ''}`}>
      <Toolbar />
      <SlideViewer>
        <SlideLoader slides={slides} />
      </SlideViewer>
      <ExitFullScreenButton />
      <SlideMosaic />
    </div>
  );
}

export default App;
