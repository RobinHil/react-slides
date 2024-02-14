import Toolbar from './components/Toolbar/Toolbar.jsx';
import SlideViewer from './components/SlideViewer/SlideViewer.jsx'
import { useSlidesCount } from './contexts/SlidesCount.context.jsx';
import { ShowSlidesNumberProvider } from './contexts/ShowSlidesNumber.context.jsx';
import { useEffect } from 'react';
import ExitFullScreenButton from './components/ExitFullScreenButton/ExitFullScreenButton.jsx';

function App() {
    const {setMaxSlide, handleDecrement, handleIncrement, handleFirst, handleLast} = useSlidesCount();
    setMaxSlide(99);

    useEffect(() => {
        function handleKeyDown(event) {
            switch (event.keyCode) {
                case 39:
                    handleIncrement();
                    break;

                case 37:
                    handleDecrement();
                    break;

                case 38:
                    handleLast();
                    break;

                case 40:
                    handleFirst();
                    break;
            
                default:
                    break;
            }
        }

        window.addEventListener('keydown', handleKeyDown);
    
        return () => {
            window.removeEventListener('keydown', handleKeyDown);
        };
    }, [handleDecrement, handleIncrement, handleFirst, handleLast]);

    return (
        <ShowSlidesNumberProvider>
            <div className="flex flex-col h-screen">
                <Toolbar />
                <SlideViewer>
                    <div className="text-center">
                        <h2 className="text-3xl font-bold mb-4">Bienvenue sur notre plateforme de présentation</h2>
                    </div>
                </SlideViewer>
                <ExitFullScreenButton />
            </div>
        </ShowSlidesNumberProvider>
    );
}

export default App;
