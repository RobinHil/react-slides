import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App.jsx';
import './index.css';
import { MosaicProvider } from './contexts/Mosaic.context.jsx';
import { FullScreenProvider } from './contexts/FullScreen.context.jsx';

ReactDOM.createRoot(document.getElementById('root')).render(
    <React.StrictMode>
        <FullScreenProvider>
        <MosaicProvider>
            <App />
        </MosaicProvider>
        </FullScreenProvider>
    </React.StrictMode>,
);
