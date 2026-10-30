import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import tailwindcss from '@tailwindcss/vite';
import { existsSync, readdirSync, readFileSync } from 'node:fs';
import { resolve } from 'node:path';
import { pathToFileURL } from 'node:url';

const DECKS = resolve(import.meta.dirname, "src/decks");
const VIRTUAL_ID = "virtual:decks";

/** Turns the name of a deck folder into a title, my-talk giving "My talk". */
function titleOf(name) {
    const words = name.replace(/[-_]+/g, " ").trim();
    return words.charAt(0).toUpperCase()+words.slice(1);
}

/** Escapes a text for an HTML attribute or element. */
function escape(text) {
    return String(text).replace(/&/g, "&amp;").replace(/"/g, "&quot;").replace(/</g, "&lt;").replace(/>/g, "&gt;");
}

/** Lists the decks, one per folder of src/decks holding a Deck.jsx, with the title and description of its meta.js. */
async function readDecks() {
    const names = readdirSync(DECKS, { withFileTypes: true })
        .filter((entry) => entry.isDirectory() && existsSync(resolve(DECKS, entry.name, "Deck.jsx")))
        .map((entry) => entry.name)
        .sort();
    return Promise.all(names.map(async (name) => {
        const file = resolve(DECKS, name, "meta.js");
        const meta = existsSync(file) ? (await import(`${pathToFileURL(file).href}?t=${Date.now()}`)).default : {};
        return { name, title: meta.title ?? titleOf(name), description: meta.description ?? "", hasPreview: existsSync(resolve(DECKS, name, "preview.png")) };
    }));
}

/** Turns the page of the site into that of a deck, with its title, description, the tags shown when sharing it, and the preloading of its code. */
function deckPage(html, deck, siteUrl, script) {
    const image = deck.hasPreview && (siteUrl ? `${siteUrl.replace(/\/?$/, "/")}${deck.name}/preview.png` : "preview.png");
    const tags = [
        `<meta name="deck" content="${escape(deck.name)}" />`,
        `<meta name="description" content="${escape(deck.description)}" />`,
        `<meta property="og:type" content="website" />`,
        `<meta property="og:title" content="${escape(deck.title)}" />`,
        `<meta property="og:description" content="${escape(deck.description)}" />`,
        image && `<meta property="og:image" content="${escape(image)}" />`,
        image && `<meta name="twitter:card" content="summary_large_image" />`,
        script && `<link rel="modulepreload" crossorigin href="${escape(script)}" />`
    ].filter(Boolean);
    return html
        .replace(/<title>.*?<\/title>/, `<title>${escape(deck.title)}</title>`)
        .replace(/\s*<\/head>/, `\n    ${tags.join("\n    ")}\n  </head>`);
}

/** Serves and builds one page per deck of src/decks, and gives the app the list of decks as a virtual module. */
function decks() {
    let config;
    let list = null;

    /** Gives the decks, read again only once a deck file has changed. */
    function listDecks() {
        list ??= readDecks();
        return list;
    }

    const app = {
        name: "decks",
        configResolved(resolved) {
            config = resolved;
        },
        resolveId(id) {
            return id===VIRTUAL_ID ? `\0${VIRTUAL_ID}` : null;
        },
        async load(id) {
            if (id!==`\0${VIRTUAL_ID}`)
                return null;
            const entries = (await listDecks()).map((deck) => `{ name: ${JSON.stringify(deck.name)}, title: ${JSON.stringify(deck.title)}, description: ${JSON.stringify(deck.description)}, Deck: lazy(() => import(${JSON.stringify(`/src/decks/${deck.name}/Deck.jsx`)})) }`);
            return `import { lazy } from "react";\n\nexport default [\n${entries.join(",\n")}\n];`;
        },
        configureServer(server) {
            server.watcher.add(DECKS);
            const reload = (pattern) => (file) => {
                if (!file.startsWith(DECKS) || !pattern.test(file.slice(DECKS.length)))
                    return;
                list = null;
                const module = server.moduleGraph.getModuleById(`\0${VIRTUAL_ID}`);
                if (module)
                    server.moduleGraph.invalidateModule(module);
                server.ws.send({ type: "full-reload" });
            };
            for (const event of ["add", "unlink", "addDir", "unlinkDir"])
                server.watcher.on(event, reload(/^\/[^/]+(\/(Deck\.jsx|meta\.js))?$/));
            server.watcher.on("change", reload(/^\/[^/]+\/meta\.js$/));
            server.middlewares.use(async (req, res, next) => {
                const [path] = req.url.split("?");
                const name = /^\/([\w-]+)\/?$/.exec(path)?.[1];
                const deck = name && (await listDecks()).find((candidate) => candidate.name===name);
                if (!deck)
                    return next();
                if (!path.endsWith("/")) {
                    res.writeHead(301, { Location: `/${name}/` });
                    return res.end();
                }
                const html = deckPage(readFileSync(resolve(config.root, "index.html"), "utf8"), deck);
                res.setHeader("Content-Type", "text/html");
                res.end(await server.transformIndexHtml(req.url, html));
            });
        }
    };

    const pages = {
        name: "decks-pages",
        enforce: "post",
        async generateBundle(options, bundle) {
            const site = bundle["index.html"];
            if (!site)
                return;
            const isRelative = config.base.startsWith(".");
            const source = isRelative ? site.source.replace(/(src|href)="\.\//g, "$1=\"../") : site.source;
            const chunks = Object.values(bundle).filter((file) => file.type==="chunk");
            for (const deck of await listDecks()) {
                const chunk = chunks.find((file) => file.facadeModuleId?.endsWith(`/src/decks/${deck.name}/Deck.jsx`));
                const script = chunk && `${isRelative ? "../" : config.base}${chunk.fileName}`;
                this.emitFile({ type: "asset", fileName: `${deck.name}/index.html`, source: deckPage(source, deck, process.env.SITE_URL, script) });
                if (deck.hasPreview)
                    this.emitFile({ type: "asset", fileName: `${deck.name}/preview.png`, source: readFileSync(resolve(DECKS, deck.name, "preview.png")) });
            }
        }
    };

    return [app, pages];
}

/** Relays the documentation to its development server, one per language, when one runs beside the app. */
function docsProxy(server) {
    if (!server)
        return undefined;
    return {
        "/docs/en": { target: `${server}:8000`, ws: true },
        "/docs/fr": { target: `${server}:8001`, ws: true }
    };
}

export { titleOf, escape, deckPage };

export default defineConfig({
    plugins: [react(), tailwindcss(), decks()],
    server: {
        proxy: docsProxy(process.env.DOCS_SERVER)
    },
    build: {
        chunkSizeWarningLimit: 1500
    }
});
