# React Slides

A presentation framework for React. Each slide is a component built from a small
set of layout and content primitives, and the deck runs in the browser with
keyboard navigation, a slide overview, and full-screen mode.

The repository ships with a twelve-slide demo deck that documents every
component, so `npm run dev` immediately shows what the library can do.

## Features

- Slides written as React components, with Tailwind CSS for styling.
- Keyboard navigation: left and right arrows to move, up and down to jump to the
  last and first slide.
- Mosaic view showing every slide at once, plus full-screen mode and an optional
  slide counter.
- Content primitives for headings, paragraphs, lists, tables, links, images,
  Markdown, and syntax-highlighted code.
- A shared theme: named font sizes, alignments, colors, and image widths, all
  mapping onto Tailwind classes.

## Getting started

Requires Node.js 22 or later.

```bash
npm install
npm run dev        # development server on http://localhost:5173
npm run build      # production build in dist/
npm run preview    # serve the production build locally
```

## Writing a slide

Create a component in `src/slides/`:

```jsx
import { CenterLayout, Heading, Paragraph } from '../slideComponents/index.jsx';

function MySlide() {
    return (
        <CenterLayout>
            <Heading fontSize={8} align="center">My Slide</Heading>
            <Paragraph fontSize={6} align="center">
                Slide content goes here.
            </Paragraph>
        </CenterLayout>
    );
}

export default MySlide;
```

Then register it in `src/slides/index.jsx`, in presentation order:

```jsx
import MySlide from './MySlide.jsx';

const slides = [
    // ...
    MySlide,
];

export default slides;
```

## Components

| Component | Purpose |
| --- | --- |
| `CenterLayout` | Centers its content vertically and horizontally |
| `TwoColumnLayout` | Side-by-side content |
| `Heading` | Titles |
| `Paragraph` | Body text |
| `List` | Bulleted or numbered lists |
| `Table` | Tabular data |
| `Link` | Hyperlinks |
| `Image` | Images, with an optional caption |
| `Code` | Code blocks with syntax highlighting |
| `Markdown` | Rendered Markdown |

Sizes, alignments, and colors are passed as props and resolved through
`src/slideComponents/theme.js`. Colors available for text, backgrounds and
dividers: `white`, `black`, `gray`, `lightGray`, `darkGray`, `red`, `orange`,
`yellow`, `lime`, `green`, `cyan`, `sky`, `blue`, `violet`, `pink`. Anything
beyond that can be done with plain Tailwind classes.

## Deployment

The build is a static bundle. Copy it to any web server:

```bash
npm run build
rsync -r dist/* /var/www/your-site/
```

Or use the included Docker setup, which builds the bundle and serves it with
Caddy:

```bash
docker compose -p react-slides up -d --build
docker compose -p react-slides down
```

The Compose file expects an external network named `proxy_network` and no
published port, so a reverse proxy in front can route to it. To run it
standalone instead, remove the `networks` block and publish a port.

## Stack

React 18, Vite, Tailwind CSS, React Markdown, react-syntax-highlighter,
Font Awesome, Docker and Caddy.

## Layout

```
src/
  slides/            the deck: one component per slide, index.jsx sets the order
  slideComponents/   layout and content primitives, theme.js
  interface/         navigation bar, mosaic, full-screen and counter controls
  contexts/          slide index, mosaic and full-screen state
```
