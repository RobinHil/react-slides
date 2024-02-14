import Toolbar from './components/interface/Toolbar.jsx';
import SlideViewer from './components/interface/SlideViewer.jsx'
import { SlidesCountProvider } from './contexts/SlidesCount.context.jsx';
import { ShowSlidesNumberProvider } from './contexts/ShowSlidesNumber.context.jsx';
import ExitFullScreenButton from './components/interface/ExitFullScreenButton.jsx';
import { FullScreenProvider } from './contexts/FullScreen.context.jsx';

function App() {

    return (
        <SlidesCountProvider max={99}>
        <ShowSlidesNumberProvider>
        <FullScreenProvider>
            <div className="flex flex-col h-screen">
                <Toolbar />
                <SlideViewer>
                    <div className="text-center">
                        <h2 className="text-3xl font-bold mb-4">Bienvenue sur notre plateforme de présentation</h2>
                    </div>
                </SlideViewer>
                <ExitFullScreenButton />
            </div>
        </FullScreenProvider>
        </ShowSlidesNumberProvider>
        </SlidesCountProvider>
    );
}

export default App;
