import { StrictMode, Suspense } from 'react';
import { createRoot } from 'react-dom/client';
import decks from 'virtual:decks';
import Home from './interface/Home.jsx';
import { HomeContext } from './contexts/Home.context.jsx';
import './index.css';

const name = document.querySelector("meta[name='deck']")?.content;
const Deck = decks.find((deck) => deck.name===name)?.Deck;

if (!name && decks.length===1)
    location.replace(`${decks[0].name}/${location.hash}`);
else
    createRoot(document.getElementById("root")).render(
        <StrictMode>
            {Deck ? (
                <HomeContext value={decks.length>1 ? "../" : null}>
                    <Suspense><Deck /></Suspense>
                </HomeContext>
            ) : <Home decks={decks} />}
        </StrictMode>
    );
