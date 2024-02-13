import Toolbar from './components/Toolbar/Toolbar.jsx';
import SlideViewer from './components/SlideViewer/SlideViewer.jsx'
import { useSlidesCount } from './contexts/SlidesCount.context.jsx';
import { ShowSlidesNumberProvider } from './contexts/ShowSlidesNumber.context.jsx';

function App() {
    const {setMaxSlide} = useSlidesCount();
    setMaxSlide(9);

    return (
        <ShowSlidesNumberProvider>
            <div className="flex flex-col h-screen">
                <Toolbar />
                <div className="flex-grow pb-4">
                    <SlideViewer>
                        <div className="text-center">
                            <h2 className="text-3xl font-bold mb-4">Bienvenue sur notre plateforme de présentation</h2>
                        </div>
                    </SlideViewer>
                </div>
            </div>
        </ShowSlidesNumberProvider>
    );
}

export default App;
