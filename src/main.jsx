import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App.jsx';
import './index.css';
import { SlidesCountProvider } from './contexts/SlidesCount.context.jsx';

ReactDOM.createRoot(document.getElementById('root')).render(
    <React.StrictMode>
        <SlidesCountProvider>
            <App />
        </SlidesCountProvider>
    </React.StrictMode>,
);
