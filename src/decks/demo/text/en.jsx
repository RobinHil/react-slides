import { Formula, Link, Text } from '../../../components/index.jsx';

const items = ["First item", "Second item", "Third item", "Fourth item", "Fifth item", "Sixth item", "..."];

const text = {
    corners: {
        chapter: "Chapter 3 · Layout",
        slideOf: (number, total) => `Slide ${number} of ${total}`
    },
    notes: {
        title: `
            ## Opening

            - Introduce yourself in **one sentence**
            - Announce the length: about *20 minutes*
            - Ask who has already written React

            > Do not read the slide out loud, it speaks for itself.
        `,
        summary: `
            ## The plan

            Go through the outline **without lingering**, each part has its own slide.

            1. Texts and colors: the basics
            2. Layouts: headers, images, lists, tables
            3. Code and Markdown to finish

            ---

            Time planned per part:

            | Part | Length |
            | --- | --- |
            | Texts and colors | 6 min |
            | Layouts | 8 min |
            | Code and Markdown | 6 min |
        `,
        lists: `
            ## Points to show

            - [x] A list is built from a **plain array**
            - [x] Bullets with \`type="bulleted"\`, numbers with \`type="numbered"\`
            - [ ] Show the right and centre alignments
            - [ ] Point out that the bullets stay aligned

            ### Example to say out loud

            \`\`\`jsx
            <List type="numbered" list={["One", "Two"]} />
            \`\`\`

            More details in the [React documentation](https://react.dev).
        `,
        formulas: `
            Notes understand formulas too, such as $\\Delta = b^2 - 4ac$, and diagrams:

            \`\`\`mermaid
            flowchart LR
                Notes --> Formulas
                Notes --> Diagrams
            \`\`\`
        `,
        steps: `
            Move on with the arrow: the three cards come one by one, then the code with the last one.
        `
    },
    title: {
        subtitle: "A library of React components",
        description: <>
            Build your slides from customizable React components,<br />
            and reach your talks anywhere, with nothing more<br />
            than an internet connection and a web browser.
        </>,
        author: "By Robin HILAIRE"
    },
    summary: {
        title: "Outline",
        parts: ["Texts", "Links", "Colors", "Backgrounds", "Palette and gradients", "Fonts", "Themes", "Headers and footers", "Images", "Lists", "Tables", "Code", "Markdown", "Diagrams", "Formulas", "Videos", "Steps"]
    },
    textTypes: {
        title: "Texts",
        heading: <>
            The first kind of plain text is the Heading component, for titles.
            Its texts are bold, and its default size is larger
            than that of the other components.<br />
            Sizes are those of Tailwind, from xs to 9xl:
        </>,
        paragraph: <>
            The second kind of plain text is the Paragraph component, for body text.<br />
            It takes the same sizes:
        </>
    },
    textFormatting: {
        title: "Texts",
        subtitle: "Text formatting",
        intro: <>The underline, strike, italic and bold props apply to every text, and the Text component formats <Text bold color={["sky-500", "violet-600"]}>a single piece</Text> of a sentence.</>,
        underline: "Underlined",
        strike: "Struck through",
        italic: "Italic",
        bold: "Bold"
    },
    links: {
        title: "Links",
        intro: <>
            Hyperlinks fit right into the presentation,<br />
            very simply, with the Link component.
        </>,
        example: <>Here is for instance a <Link fontSize="3xl" href="https://google.com">link to google.com</Link>.</>
    },
    colors: {
        title: "Colors",
        text: "Text",
        textIntro: <>The whole Tailwind palette can be used<br />for texts, here is a selection.</>,
        background: "Background",
        backgroundIntro: <>The whole Tailwind palette can be used<br />for backgrounds, here is a selection.</>,
        footnote: "These colors apply to texts, and to lists and tables as well."
    },
    backgrounds: {
        title: "Backgrounds",
        intro: <>
            Every slide can have its own background color, plain or a gradient, over its whole surface.<br />
            A single prop on the slide, in the deck, is enough:
        </>,
        gradient: "gradient",
        footnote: "The mosaic thumbnail and the edges of the screen in full screen follow the color of the slide."
    },
    palette: {
        title: "Palette and gradients",
        intro: <>
            26 hues in 11 shades, from 50 (very light) to 950 (very dark), usable everywhere: color="rose-600", bg="sky-50"...<br />
            An array of colors makes a gradient, for backgrounds as well as texts.
        </>,
        gradientText: "Gradient text"
    },
    fonts: {
        title: "Fonts",
        intro: <>
            A font for the whole deck with &lt;Presentation font="inter"&gt;, one per slide with &lt;Slide font="lora"&gt;,<br />
            or on a single component with font="playfair-display". Any CSS font family is accepted too.
        </>,
        sample: "The quick brown fox",
        sampleEnd: "jumps over the lazy dog."
    },
    themes: {
        title: "Themes",
        intro: <>
            A theme gathers the fonts, the text color, the background, the accent and the code theme.<br />
            It applies to the whole deck, or to a single slide, like this one in the night theme.
        </>,
        previews: {
            light: ["Light", "The default theme, plain and readable."],
            night: ["Night", "A dark background, for dim rooms."],
            paper: ["Paper", "Serif headings, on a cream background."]
        }
    },
    headersFooters: {
        title: "Headers and footers",
        intro: <>
            Each of the 4 corners takes a text, an object {"{ text, font, color, fontSize }"}, a function or a React element,<br />
            and the pageNumber shortcut shows the slide number in any corner.<br />
            Corners set on the deck show on every slide, and each slide can replace or hide them.
        </>,
        code: `// On every slide
<Presentation corners={{ topLeft: "React Slides", bottomRight: pageNumber }}>

// On one slide: replace a corner, hide one, or hide them all
<Slide corners={{ topRight: { text: "Appendix", color: "sky-600" }, bottomLeft: null }}>
<Slide corners={false}>`
    },
    images: {
        title: "Images",
        alt: "React Slides logo",
        simple: ["Simple", <>
            A plain image, imported from the src/assets folder.
            By default, it takes all the room available, never overflowing nor stretching.
        </>],
        captioned: ["Captioned", <>
            An image with a caption.
            It is then wrapped in a figure.
            The caption is in italics, in small text by default.
        </>, "Here is a captioned image, as a figure."],
        size: ["Size", <>
            The "width" prop sets the width of an image, as a fraction of the room available.
            It always keeps its proportions.<br />
            width="auto" shows it at its own size, and "maxHeight" caps its height.
        </>, "Here is the same image with width=\"1/2\"."],
        caption: ["Caption", <>
            A caption can be formatted by putting a text component in it,
            in place of plain text as children.
        </>, "Here is a caption drawn by a nice Heading component."]
    },
    lists: {
        title: "Lists",
        example: "For example:",
        items,
        bullets: ["Bullets", "A basic bulleted list is built from a plain array of strings."],
        numbers: ["Numbers", "A basic numbered list is built from a plain array of strings."],
        styles: ["Formatting", <>
            A list follows the styles put on it,
            so the style of its texts can be changed.
        </>],
        styled: ["Bold text", "Underlined text", "Italic text", "Struck text", "Blue list background", "Red list text", "Smaller text", "..."],
        alignments: ["Alignments", "Lists can be aligned in several ways:"],
        left: "On the left (default):",
        right: "On the right:",
        center: "In the centre:"
    },
    tables: {
        title: "Tables",
        subjects: ["Mathematics", "French", "History", "Science", "English", "Physics", "Chemistry", "Geography", "Arts", "Sport"]
    },
    code: {
        title: "Code",
        dark: "Dark theme",
        light: "Light theme",
        sample: `#include <iostream>
using namespace std;

template <typename T>
T average(T values[], int size) {
    T sum = 0;
    for (int i = 0; i < size; i++) {
        sum += values[i];
    }
    return sum / size;
}

int main() {
    int integers[] = {1, 2, 3, 4, 5};
    double reals[] = {1.1, 2.2, 3.3, 4.4, 5.5};

    cout << "Average of the integers: " << average(integers, 5) << endl;
    cout << "Average of the reals: " << average(reals, 5) << endl;

    return 0;
}`
    },
    markdown: {
        left: `# Heading 1
## Heading 2
### Heading 3
#### Heading 4
##### Heading 5
###### Heading 6

<br/>

**Bold text**

*Italic text*

~~Struck text~~

Text with inline \`code\`

Plain text

<br/>

| Column 1 | Column 2 | Column 3 |
| -------- | -------- | -------- |
|  Row 1   | Value 1  | Value 2  |
|  Row 2   | Value 3  | Value 4  |`,
        right: `- [x] Done task
- [ ] Task to do

<br/>

> Here is a quote

<br/>

- Bulleted item no. 1
- Bulleted item no. 2

<br/>

1. Numbered item no. 1
2. Numbered item no. 2

<br/>

\`\`\`javascript
const example = (num) => {
    if (num > 0) {
        return "Positive";
    } else if (num < 0) {
        return "Negative";
    } else {
        return "Zero";
    }
};
\`\`\`

<br/>

[Link to google.com](https://google.com)`,
        footnote: <>
            Markdown styles are fixed: changing them means editing the Markdown component itself.<br />
            The remark-gfm and rehype-raw plugins are installed, to widen what Markdown can do and to allow HTML tags in it.
        </>
    },
    diagrams: {
        title: "Diagrams",
        intro: "A diagram is written as text, in the Mermaid language, and follows the theme and the font of the slide.",
        flowchart: ["Flowchart", `
            flowchart LR
                A[Idea] --> B{Clear enough?}
                B -- Yes --> C[Slide]
                B -- No --> D[Draft]
                D --> B
        `],
        sequence: ["Sequence", `
            sequenceDiagram
                Speaker->>Audience: Asks a question
                Audience-->>Speaker: Raises a hand
                Speaker->>Audience: Moves on
        `]
    },
    formulas: {
        title: "Formulas",
        component: ["Component", <>A formula is written in LaTeX, inside a sentence like <Formula>{"E = mc^2"}</Formula>, or on its own line with display:</>],
        markdown: ["Markdown", String.raw`
Markdown understands them too: $a^2 + b^2 = c^2$ in the text, and between double dollars for a block.

$$
\sum_{k=1}^{n} k = \frac{n(n+1)}{2}
$$
        `]
    },
    videos: {
        title: "Videos",
        file: ["File", <>
            A video imported from src/assets. With autoPlay, it starts muted as the slide shows, and loop plays it over and over.
            In thumbnails and the PDF, its first frame stands in for it.
        </>, "A video playing on its own, in a loop.", "Animation of the React Slides logo"],
        embed: ["YouTube and Vimeo", <>
            The address of the video is all it takes. The player only loads when the slide shows.
            In the PDF, its thumbnail becomes a link to the video.
        </>, "Big Buck Bunny, by the Blender Foundation."]
    },
    steps: {
        title: "Steps",
        intro: <>
            Elements show one by one with the next arrow, and the address keeps the step: #slide.step.<br />
            The order prop puts several elements on the same step or changes their order.
        </>,
        cards: [
            ["An idea", "Each element wrapped in Step waits for the next arrow to show."],
            ["Then another", "It keeps its room on the slide: nothing moves when it shows."],
            ["And the conclusion", "The previous arrow goes back, step by step."]
        ],
        code: `<Step>Shown first</Step>
<Step>Then this one</Step>
<Step order={1}>At the same time as the first</Step>`
    },
    conclusion: {
        title: "That's all.",
        alt: "React Slides logo",
        caption: "Yes, this is a Markdown image :)"
    }
};

export default text;
