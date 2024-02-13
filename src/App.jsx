import Toolbar from './components/Toolbar/Toolbar.jsx';
import SlideViewer from './components/SlideViewer/SlideViewer.jsx'
import { useSlidesCount } from './contexts/SlidesCount.context.jsx';
import { ShowSlidesNumberProvider } from './contexts/ShowSlidesNumber.context.jsx';
import { useEffect } from 'react';

function App() {
    const {setMaxSlide, handleDecrement, handleIncrement, handleFirst, handleLast} = useSlidesCount();
    setMaxSlide(9);

    useEffect(() => {
        function handleKeyPress(event) {
            if (event.keyCode === 39)
                handleIncrement();
            else if (event.keyCode === 37)
                handleDecrement();
            else if (event.keyCode === 38)
                handleLast();
            else if (event.keyCode === 40)
                handleFirst();
            else if (event.keyCode === 32)
                handleIncrement();
            else
                return;
        }

        window.addEventListener('keydown', handleKeyPress);
    
        return () => {
            window.removeEventListener('keydown', handleKeyPress);
        };
    }, [handleDecrement, handleIncrement, handleFirst, handleLast]);

    return (
        <ShowSlidesNumberProvider>
            <div className="flex flex-col h-screen">
                <Toolbar />
                <div className="flex-grow">
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
