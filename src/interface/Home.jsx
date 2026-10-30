import { Suspense, useEffect, useRef, useState } from 'react';
import { faBookOpen } from '@fortawesome/free-solid-svg-icons';
import { PreviewContext } from '../contexts/Preview.context.jsx';
import Icon from './Icon.jsx';
import { labels } from './labels.js';
import { useInterfaceLanguage } from './hooks.js';

/** Name of a language in the language of the interface, such as "Français" for "fr". */
function languageName(lang, language) {
    const name = new Intl.DisplayNames([language], { type: "language" }).of(lang) ?? lang;
    return name.charAt(0).toLocaleUpperCase(language)+name.slice(1);
}

/** Turns true once the referenced element comes near the visible part of the page, and stays so. */
function useNearScreen(ref) {
    const [isNear, setNear] = useState(false);

    useEffect(() => {
        const observer = new IntersectionObserver(([entry]) => {
            if (!entry.isIntersecting)
                return;
            setNear(true);
            observer.disconnect();
        }, { rootMargin: "50%" });
        observer.observe(ref.current);
        return () => observer.disconnect();
    }, [ref]);

    return isNear;
}

/** Card of a deck on the home page, with its first slide, its title, its description, how many slides it holds and its language, loading the deck once the card comes near the screen. */
function DeckCard({ deck: { name, title, description, Deck }, text, language }) {
    const cardRef = useRef(null);
    const isNear = useNearScreen(cardRef);
    const [details, setDetails] = useState(null);
    const placeholder = <div className="aspect-video bg-gray-100 dark:bg-gray-800" />;

    return (
        <a
            ref={cardRef}
            href={`${name}/`}
            className="group flex flex-col overflow-hidden rounded-2xl bg-white ring-1 ring-gray-200 shadow-sm outline-hidden transition duration-300 ease-fluid hover:-translate-y-1 hover:shadow-xl focus-visible:ring-2 focus-visible:ring-cyan-600 dark:bg-gray-900 dark:ring-gray-800 dark:shadow-black/40"
        >
            <div className="pointer-events-none border-b border-gray-100 dark:border-gray-800">
                {isNear ? (
                    <Suspense fallback={placeholder}>
                        <PreviewContext value={{ onRead: setDetails }}>
                            <Deck />
                        </PreviewContext>
                    </Suspense>
                ) : placeholder}
            </div>
            <div className="flex grow flex-col gap-1 p-5">
                <h2 className="text-lg font-semibold text-gray-900 dark:text-gray-100">{title}</h2>
                {description && (
                    <p className="text-sm text-gray-500 dark:text-gray-400">{description}</p>
                )}
                <p className="mt-auto flex items-center gap-2 pt-3 text-xs font-medium text-gray-500 tabular-nums dark:text-gray-400">
                    {details ? (
                        <>
                            <span>{details.count} {text.slides}</span>
                            <span aria-hidden="true">·</span>
                            <span lang={language}>{languageName(details.lang, language)}</span>
                        </>
                    ) : " "}
                </p>
            </div>
        </a>
    );
}

/** Home page of the site, listing its decks as cards and leading to the documentation, always in the theme of the system and the language of the browser. */
function Home({ decks }) {
    const language = useInterfaceLanguage();
    const text = labels[language];

    return (
        <main className="min-h-dvh bg-gray-50 px-4 py-10 sm:px-8 sm:py-14 dark:bg-gray-950">
            <div className="mx-auto max-w-6xl">
                <div className="flex items-start justify-between gap-4">
                    <div>
                        <h1 className="text-3xl font-bold tracking-tight text-gray-900 sm:text-4xl dark:text-gray-100">{document.title}</h1>
                        <p className="mt-2 text-gray-500 tabular-nums dark:text-gray-400">{decks.length} {text.decks}</p>
                    </div>
                    <a
                        href={`docs/${language}/`}
                        aria-label={text.documentation}
                        className="flex shrink-0 items-center gap-2 rounded-full bg-white p-3 sm:px-4 sm:py-2.5 text-sm font-semibold text-gray-700 ring-1 ring-gray-200 shadow-sm outline-hidden transition duration-300 ease-fluid hover:-translate-y-0.5 hover:shadow-md hover:text-gray-900 focus-visible:ring-2 focus-visible:ring-cyan-600 dark:bg-gray-900 dark:text-gray-200 dark:ring-gray-800 dark:hover:text-white"
                    >
                        <Icon icon={faBookOpen} className="h-4" />
                        <span className="hidden sm:inline">{text.documentation}</span>
                    </a>
                </div>
                <div className="mt-8 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
                    {decks.map((deck) => (
                        <DeckCard key={deck.name} deck={deck} text={text} language={language} />
                    ))}
                </div>
            </div>
        </main>
    );
}

export default Home;
