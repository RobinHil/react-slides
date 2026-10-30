# AGENTS.md

This file provides guidance to coding agents (Claude Code, Codex and others) when working with code in this repository. `CLAUDE.md` is a symbolic link to it.

## Commands

The app is meant to be developed and checked in the Docker development container, not with a dev server started on the host:

```bash
docker compose -f docker/compose.dev.yml up --watch   # live reload on http://localhost:5173
```

It runs two services: `app` (Vite) and `docs` (Zensical serving the user guide, English on port 8000 and French on 8001, relayed by Vite at `/docs/en/` and `/docs/fr/` through `DOCS_SERVER`). `src`, `index.html`, `vite.config.js` and `docs/` are synced into the containers; a change to `package.json`, `pnpm-lock.yaml` or `docs/requirements.txt` rebuilds them. A file edited while a container rebuilds may miss the sync: touch it again.

Host commands (Node.js version in `.nvmrc`, pnpm version in `package.json`):

```bash
pnpm install
pnpm lint          # ESLint, zero warnings allowed
pnpm build         # static site in dist/: home page, one page per deck
pnpm preview       # serve dist/
pnpm docs:build    # after pnpm build: user guide into dist/docs (needs `pip install -r docs/requirements.txt`)
pnpm test:unit     # Vitest unit tests, runnable on the host
```

The full suite runs in the test container (`docker/compose.test.yml`, Playwright image, `linux/amd64` like CI, the repository bind-mounted), never on the host, because the reference screenshots must be drawn by the same fonts and browsers everywhere:

```bash
pnpm test:docker                                                          # unit, test build, end-to-end
docker compose -f docker/compose.test.yml run --rm test pnpm test:update  # retake the reference screenshots
docker compose -f docker/compose.test.yml run --rm test sh -c "pnpm build && pnpm screenshots"   # retake the deck previews and the user guide pictures
docker compose -f docker/compose.test.yml run --rm test sh -c "pnpm test:build && pnpm exec playwright test navigation --project chromium"   # one file, one browser
```

- `tests/unit/`: pure helpers (`contexts/position.js`, `interface/slides.js`, `interface/print.js`, `interface/time.js`, `components/links.js`, `components/embeds.js`, styles, labels, the decks plugin of `vite.config.js`) and the parity of the French and English texts, guide pages and pictures.
- `tests/e2e/`: Playwright against `dist/` built for `/react-slides/` (`pnpm test:build`) and served by `tests/server.mjs`, which mimics Pages and nginx and sends the content security policies read from `compose.prod.yml`. Projects `chromium` and `firefox` (desktop) run every file but `mobile.spec.js`, which the `mobile` project (Pixel 7, touch) runs alone. `helpers.js` holds the shared steps; `__screenshots__/` holds the reference screenshots, per project, committed.
- After a change of the interface or of the demo, retake the screenshots and look at them before keeping them. `vite build --base=/sub/path/` and `--base=./` must both keep working (the site is deployed under a subpath on GitHub Pages and as a relative zip on releases); `build.spec.js` checks the relative build from any folder.

## Architecture

- **Decks.** Every folder of `src/decks` holding a `Deck.jsx` is a deck, with an optional `meta.js` (title, description) and `preview.png` (sharing image). The `decks()` plugin in `vite.config.js` exposes them as the `virtual:decks` module (lazy components), serves `/<name>/` in dev, and emits `dist/<name>/index.html` from `index.html` with the title, Open Graph tags and a `modulepreload` of the deck chunk. `src/main.jsx` reads `<meta name="deck">` to render that deck, or the home page (`interface/Home.jsx`) when absent; a site with a single deck redirects to it.
- **Presentation.** `interface/Presentation.jsx` turns its `<Slide>` children into plain slide objects, layering settings in this order: defaults (`components/themes.js` light), deck `theme`, deck props, slide `theme`, slide props; `corners` merge, `false` drops them. The same component also renders the home page card (when `PreviewContext` is set) and the presenter view (when the address holds `?presenter=<session>`).
- **State.** Contexts in `src/contexts`: `Slides` (position `{slide, step}` synced with the hash `#7.2`, step counts, view transitions, and the `BroadcastChannel` that keeps the audience and presenter windows of one session together), `Panels`, `FullScreen`, `Print`, plus small ones read by slide content: `SlideTheme`, `LiveSlide` (only the slide presented is live: videos play there, thumbnails and print show stills), `Steps`, `Preview`, `Home`.
- **Drawing a slide.** `SlideCanvas` lays a slide out at its reference size (1920×1080 by default) and scales it; `SlideFrame` shrinks overflowing content by dichotomy, grows `data-fill` media to the room left, and caches the layout per slide object. Print uses `zoom` instead of `transform` so PDF readers draw it faithfully.
- **Steps.** `<Step>` only renders `data-step` attributes; `StepsProvider` numbers them from the DOM and toggles `data-shown`. A step past the count means "end of the slide" (moving backward lands on `step: Infinity`).
- **Transitions.** `Slides.context` runs `startViewTransition` on the slide viewer element (scoped view transitions), so the toolbar stays clickable; browsers without them (Firefox) fall back to the document, `SlideViewer` then puts the transition classes on `<html>`, and a click caught by the page transition is replayed on the element under the pointer once the transition is skipped.
- **Thumbnails.** `SlideThumbnail` (slide list and mosaic) draws only near the visible part of its panel, through shared IntersectionObservers per scroll root and an 8 ms per frame update queue.
- **PDF export.** `PrintDeck` renders every slide (or every step with `printSteps`) at full size off screen, waits for fonts, images and Suspense, replaces blurred shadows by sharp layers and gradient text by per-letter colors, then calls `window.print()`. Only Chrome and Firefox are supported for PDF.
- **Toolbar.** `Toolbar` is a three-column grid whose middle column (`SlidesNav`) must stay exactly centred; buttons appear through container queries on the bar's own width. Every keyboard shortcut belongs to a `ToolbarButton` and only fires while that button is shown (`useShortcut` checks `checkVisibility()`): no button, no shortcut. The help lists the shortcuts shown when it opens.
- **Languages.** The whole interface (home, toolbar, help, presenter view) follows the browser language through `useInterfaceLanguage`/`useLabels` (labels in `interface/labels.js`, French and English); slides and notes keep the `lang` of their deck.
- **Demo deck.** `src/decks/demo/DemoDeck.jsx` builds the slides from a texts object; `demo/Deck.jsx` passes `demo/text/fr.jsx`, `demo-en/Deck.jsx` passes `demo/text/en.jsx`. Every text shown on a demo slide lives in those two files, kept in step.
- **User guide** (`docs/`): Zensical, one site per language (`mkdocs.en.yml`, `mkdocs.fr.yml`, both inheriting `mkdocs.base.yml`), pages in `docs/en` and `docs/fr` kept in step, built by `docs/build.sh` into `docs/site` then `dist/docs`, `docs/index.html` redirecting to the browser language. Its pictures and the deck `preview.png` files are committed, taken by `scripts/screenshots.mjs` from a build in the test container; retake them after changing the interface or the demo.
- **Content components** (`src/components`): `Code` (Shiki, grammars loaded on demand), `Markdown`, `Diagram` (Mermaid, laid out in a hidden sandbox) and `Formula` (KaTeX) are lazy chunks; colors, sizes and fonts are Tailwind theme names resolved through CSS variables in `components/styles.js`.

## Deployment

- `.github/workflows/pages.yml`: the test suite in the test container, and in parallel lint, build against the Pages base path, build the user guide, check every deck page and the guide; then deploy once both pass, and fetch the published pages back. The Playwright report is uploaded when the tests fail.
- `.github/workflows/release.yml`: on a `v*` tag, runs the test suite, then builds with `--base=./`, adds the guide and attaches a zip to the release.
- `docker/`: `compose.dev.yml` for development; `compose.test.yml` for the tests (Dockerfile stage `test`: Playwright image, Node.js from `.nvmrc`, Zensical); `compose.prod.yml` runs nginx behind Traefik (Let's Encrypt, security headers) with a Docker socket proxy. The app's CSP only lets in the YouTube and Vimeo players and YouTube thumbnails from outside; `/docs` has its own router and CSP allowing the inline scripts of the Material theme and the GitHub API. The Dockerfile builds the guide in a Python stage (`docs-build`) and serves it at `/docs`. Images come from Docker Hardened Images (`dhi.io`). Labels in Compose are YAML: a value containing `: ` breaks the file.

## Conventions

- Everything in the code base is in English: names, docs, files. User-facing texts exist in English and French (`interface/labels.js`, the demo texts, the user guide) and change together.
- No comments inside code. Every function, methods included, has a one-line English `/** ... */` doc above it.
- 4-space indentation, `function` declarations for components and helpers, compact operators without spaces (`a===b`, `cond?"x":""` inside class strings), brace-less single-line `if`, `export default X;` at the end of the file.
- Style with Tailwind classes; `src/index.css` only holds Tailwind configuration (imports, variants, theme). Animations use the `ease-fluid` curve and stay smooth.
- The site must remain fully static and work on GitHub Pages; decks are built by editing `src/decks` only, whatever their size or content, PDF export included.
- Ask the maintainer to validate technical choices before implementing them, and never commit or push unless asked.
