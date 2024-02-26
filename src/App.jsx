import React from 'react';
import Toolbar from './interface/Toolbar.jsx';
import SlideViewer from './interface/SlideViewer.jsx';
import { SlidesCountProvider, useSlidesCount } from './contexts/SlidesCount.context.jsx';
import ExitFullScreenButton from './interface/ExitFullScreenButton.jsx';
import { FullScreenProvider } from './contexts/FullScreen.context.jsx';
import SlideLoader from './interface/SlideLoader.jsx';
import slides from './slides/index.jsx';

function App() {
    return (
        <SlidesCountProvider max={slides.length}>
            <FullScreenProvider>
            <div className="flex flex-col h-screen">
                <Toolbar />
                <SlideViewer>
                    <SlideLoader slides={slides} />
                </SlideViewer>
                <ExitFullScreenButton />
            </div>
            </FullScreenProvider>
        </SlidesCountProvider>
    );
}

export default App;
