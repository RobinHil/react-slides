# Building presentations

A presentation, or deck, is a React component written in `src/decks`. Its slides are made of the components of the library, and nothing else in the project needs to change: the home page, the page of the deck, its sharing preview and its PDF export follow on their own.

## Working on a deck

The simplest way is the development container, with live reload on <http://localhost:5173> and this guide on <http://localhost:5173/docs/en/>:

```bash
docker compose -f docker/compose.dev.yml up --watch
```

Images come from Docker Hardened Images: log in once with `docker login dhi.io`, with a free Docker account.

Without Docker, install Node.js (version in `.nvmrc`) and pnpm (version in `package.json`), then:

```bash
pnpm install
pnpm dev     # http://localhost:5173
pnpm lint    # check the code
pnpm build   # static site in dist/
```

## In this part

| Page | Content |
| --- | --- |
| [Decks](decks.md) | Creating a deck: its folder, title, description and preview |
| [Slides](slides.md) | `<Presentation>` and `<Slide>`, and how slides fit the screen |
| [Colors, fonts and themes](themes.md) | Backgrounds, the color palette, gradients, fonts and themes |
| [Texts](text.md) | `Text`, `Heading`, `Paragraph`, `Link`, `List`, `Table` |
| [Layouts](layouts.md) | `CenterLayout`, `TwoColumnLayout`, `GridLayout`, `RowLayout`, `Card`, `ColorSwatch` |
| [Images and videos](media.md) | `Image`, `Video` |
| [Code and Markdown](code-and-markdown.md) | `Code`, `Markdown` |
| [Diagrams and formulas](diagrams-and-formulas.md) | `Diagram`, `Formula` |
| [Steps and transitions](steps-and-transitions.md) | `Step`, transitions between slides |
| [Headers, footers and notes](corners-and-notes.md) | Corners of the slides, speaker notes |
| [Deployment](deployment.md) | GitHub Pages, releases, Docker |

The demo deck, in `src/decks/demo`, uses every component; each page shows the slide that presents it.
