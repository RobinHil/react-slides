# Slides

## Presentation

`<Presentation>` holds the slides, in presentation order, and the settings they share. A slide takes any content: a component of its own file or elements written in place. Slides can be grouped in fragments (`<>...</>`) or built with `map`.

| Prop | Default | Meaning |
| --- | --- | --- |
| `theme` | `themes.light` | Theme of the deck, its other props coming on top, see [themes](themes.md#themes) |
| `size` | `{ width: 1920, height: 1080 }` | Reference size of the slides, for a 4:3 or portrait deck |
| `lang` | English | Language of the slides and notes, such as `"fr"` |
| `font` | `"sans"` | Font of every slide |
| `headingFont` | the text font | Font of the headings |
| `color` | `"black"` | Color of the text |
| `background` | `"white"` | Color or gradient of every slide |
| `accentColor` | `"#0891b2"` | Color of the progress bar and of the current thumbnail, any CSS color |
| `codeTheme` | `"dark"` | Theme of the code blocks, `"dark"` or `"light"` |
| `diagramTheme` | `"light"` | Theme of the diagrams, `"light"`, `"dark"` or any Mermaid theme |
| `corners` | none | Headers and footers of every slide, see [corners](corners-and-notes.md) |
| `transition` | `"fade"` | Transition between slides: `"fade"`, `"slide"` or `"none"` |
| `printSteps` | `false` | Print one page per step instead of one page per slide |

## Slide

The props of `<Slide>` change one slide, over the settings of the deck:

| Prop | Meaning |
| --- | --- |
| `theme` | Theme of the slide, over that of the deck |
| `background` | Color or gradient of the slide |
| `font`, `headingFont`, `color`, `codeTheme`, `diagramTheme` | Fonts, text color, code and diagram themes |
| `corners` | Corners replacing those of the deck, or `false` to hide them all |
| `notes` | Speaker notes, in Markdown |
| `transition` | Transition leading to this slide |

```jsx
<Slide background="slate-800" font="lora"><Chapter /></Slide>
<Slide background={["sky-100", "violet-200"]} notes="Keep it short.">
    <Summary />
</Slide>
```

## Fitting the screen

Slides are laid out at their reference size, 1920×1080 by default, then scaled as a whole to the screen. Pick font and image sizes as for a 1080p display: they stay in proportion on a laptop, a projector or a phone. A slide holding more than fits, a long text or a wide table, is shrunk just enough to fit instead of overflowing, and images given the room left grow to fill it.

A slide that fails shows its error in its place, and the rest of the deck keeps working.

## A slide of its own file

A slide of its own file is a plain component:

```jsx
import { CenterLayout, Heading, Paragraph } from '../../components/index.jsx';

/** Opening slide of the talk. */
function Intro() {
    return (
        <CenterLayout>
            <Heading fontSize="8xl" align="center">My talk</Heading>
            <Paragraph fontSize="3xl" align="center">A subtitle</Paragraph>
        </CenterLayout>
    );
}

export default Intro;
```

All components come from `src/components/index.jsx`; `Presentation` and `Slide` from `src/interface/index.jsx`.
