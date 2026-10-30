# Decks

Every folder of `src/decks` holding a `Deck.jsx` is a deck, served at the address of its folder name: `src/decks/my-talk` opens at `/my-talk/`.

## Starting a deck

Copy `src/decks/starter` and rename the copy. The new deck appears on the home page, gets its own page, and its PDF export works the same.

```text
src/decks/my-talk/
  Deck.jsx      the slides
  meta.js       title and description, optional
  preview.png   picture shown when the address is shared, optional
  Intro.jsx     slides of their own file, as many as needed
```

`Deck.jsx` exports a component returning a `<Presentation>`, with one `<Slide>` per slide:

```jsx
import { Presentation, Slide } from '../../interface/index.jsx';
import { CenterLayout, Heading } from '../../components/index.jsx';
import Intro from './Intro.jsx';

/** My talk. */
function Deck() {
    return (
        <Presentation lang="en">
            <Slide><Intro /></Slide>
            <Slide>
                <CenterLayout>
                    <Heading fontSize="8xl" align="center">Thank you</Heading>
                </CenterLayout>
            </Slide>
        </Presentation>
    );
}

export default Deck;
```

## Title and description

`meta.js` gives the title of the browser tab, of the home page card and of the shared link, and the text below it:

```js
const meta = {
    title: "My talk",
    description: "What the talk is about, in one sentence."
};

export default meta;
```

Without it, the title comes from the folder name, `my-talk` giving "My talk".

## Sharing preview

`preview.png` is the picture social networks and chat apps show for the address of the deck. `pnpm screenshots` takes it, from a picture of the first slide, for every deck at once (see [Deployment](deployment.md#screenshots)); any picture of 1200×675 pixels works too.

## Language

`lang` on `<Presentation>` sets the language of the slides and the notes, for screen readers and hyphenation. The interface around the slides follows the language of the visitor's browser.

A deck in several languages is one deck per language, sharing its slides. The demo does so: `src/decks/demo/DemoDeck.jsx` builds the slides from texts given to it, and `demo/Deck.jsx` and `demo-en/Deck.jsx` give it the French and English texts of `demo/text/`.

## Assets

Images and videos live in `src/assets` and are imported, so the build checks they exist and serves them at the right address wherever the site is hosted:

```jsx
import photo from '../../assets/photo.jpg';
```
