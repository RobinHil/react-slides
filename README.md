# React Slides

A presentation framework for React. Each slide is a component built from a small set of layout and content components, and the presentations run in any web browser, as a fully static site.

- **Live:** <https://robinhil.github.io/react-slides/>
- **User guide:** [English](https://robinhil.github.io/react-slides/docs/en/) · [Français](https://robinhil.github.io/react-slides/docs/fr/)

The repository ships with three decks: a twenty-one-slide demo that presents every component, in French and in English, and a three-slide starter to copy for a new presentation.

## Features

- Slides written as React components, styled with the words of Tailwind: its text sizes (`"4xl"`), its whole color palette (`"sky-500"`) and its fonts.
- Several decks in one site, each at its own address with its title, description and sharing preview, and a home page listing them.
- Slides that fit any screen, content too large for a slide being shrunk until it fits.
- Navigation from the keyboard, a presentation remote or a touch screen, with the address following the current slide and step (`#7.2`).
- A slide list and a full-screen mosaic, speaker notes in Markdown, full screen and a progress bar.
- A presenter view for two screens: the current slide, what comes next, the notes, a timer and the time of day, the deck going full screen on the other screen.
- Export of the whole deck to PDF, one slide per page, with sharp, selectable text and working links.
- Content revealed step by step, transitions between slides, themes for a deck or a slide, headers and footers.
- Headings, paragraphs, lists, tables, links, images, videos (files, YouTube, Vimeo), Markdown, highlighted code, Mermaid diagrams and LaTeX formulas.
- An interface in English or French, following the browser, and the light or dark theme of the system.

Everything about using the interface and writing decks is in the [user guide](https://robinhil.github.io/react-slides/docs/en/), whose sources are in `docs/`.

## Getting started

The simplest way to work is the development container, with live reload on <http://localhost:5173> and the user guide on <http://localhost:5173/docs/en/>. Its images come from Docker Hardened Images: log in once with `docker login dhi.io`, with a free Docker account.

```bash
docker compose -f docker/compose.dev.yml up --watch
```

To work without Docker, install Node.js (version in `.nvmrc`) and pnpm (version in `package.json`):

```bash
pnpm install
pnpm dev            # development server on http://localhost:5173
pnpm lint           # check the code with ESLint
pnpm build          # static site in dist/
pnpm preview        # serve dist/
```

The tests run in a container, the one CI uses, so that their screenshots are drawn the same way everywhere:

```bash
pnpm test:docker    # unit, end-to-end and visual tests, in Chromium, Firefox and on a phone
pnpm test:unit      # unit tests alone, without Docker
```

To start a deck, copy `src/decks/starter` to `src/decks/<name>`: it appears on the home page and opens at `/<name>/`.

## Documentation and screenshots

The user guide is built with [Zensical](https://zensical.org), one site per language, into `dist/docs/`:

```bash
pip install -r docs/requirements.txt
pnpm build && pnpm docs:build
```

The sharing previews of the decks (`src/decks/<deck>/preview.png`) and the pictures of the guide (`docs/<language>/images/`) are taken from the built site by one script, in the test container so that they look the same whoever takes them, to run again after changing the interface, the first slide of a deck or the demo:

```bash
docker compose -f docker/compose.test.yml run --rm test sh -c "pnpm build && pnpm screenshots"
```

## Deployment

- **GitHub Pages:** every push to `main` runs `.github/workflows/pages.yml`, which runs the tests, lints, builds the site and the guide, checks them, publishes them and fetches them back.
- **Releases:** pushing a `v*` tag runs the tests, then publishes a GitHub release with the built site, guide included, as a zip using relative addresses, to copy to any web server.
- **Docker:** `docker/compose.prod.yml` serves the site and the guide with nginx behind Traefik (Let's Encrypt, HTTP/3, security headers), from Docker Hardened Images. Fill in `docker/.env` from `docker/.env.example`, then `docker compose -f docker/compose.prod.yml up -d --build`.

The [deployment page](https://robinhil.github.io/react-slides/docs/en/building/deployment/) of the guide gives the details.

## Layout

```text
src/
  decks/             one folder per deck: Deck.jsx, optional meta.js and preview.png
    demo/            the demo: shared slides, French deck, texts in text/fr.jsx and text/en.jsx
    demo-en/         the English demo, built from the same slides
    starter/         a minimal deck to copy
  components/        content and layout components, themes and shared styles
  interface/         Presentation and Slide, home page, toolbar, slide list, mosaic,
                     notes, help, presenter view, PDF export, interface labels
  contexts/          shared state: slides and position, panels, full screen, printing
  assets/            images and videos imported by the slides
docs/                user guide: configuration, en/ and fr/ pages and pictures, build.sh
scripts/             screenshots.mjs, the previews of the decks and the pictures of the guide
tests/               unit/ (Vitest), e2e/ (Playwright) with its reference screenshots, server.mjs
docker/              Dockerfile, Compose files for development, tests and production, nginx
vite.config.js       the decks plugin: the list of decks and one page per deck
AGENTS.md            guidance for coding agents (CLAUDE.md links to it)
```

## Stack

React 19, Vite 8, Tailwind CSS 4, React Markdown, Shiki, Mermaid, KaTeX, Font Awesome 7, Fontsource, ESLint 10, Vitest, Playwright, axe, Zensical, pnpm, Docker Hardened Images, Traefik and nginx.

## License

[MIT](LICENSE)
