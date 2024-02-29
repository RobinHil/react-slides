import Toolbar from './interface/Toolbar.jsx';
import SlideViewer from './interface/SlideViewer.jsx';
import { SlidesCountProvider, useSlidesCount } from './contexts/SlidesCount.context.jsx';
import ExitFullScreenButton from './interface/ExitFullScreenButton.jsx';
import SlideLoader from './interface/SlideLoader.jsx';
import slides from './slides/index.jsx';
import Mosaic from './interface/Mosaic.jsx';
import { useMosaic } from './contexts/Mosaic.context.jsx';

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
