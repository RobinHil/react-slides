import { describe, expect, it } from 'vitest';
import { deckPage, escape, titleOf } from '../../vite.config.js';

const PAGE = `<!doctype html>
<html lang="en">
  <head>
    <title>React Slides</title>
  </head>
  <body></body>
</html>`;

describe("titleOf", () => {
    it("turns a folder name into a title", () => {
        expect(titleOf("my-talk")).toBe("My talk");
        expect(titleOf("intro_to_react")).toBe("Intro to react");
        expect(titleOf("demo")).toBe("Demo");
    });
});

describe("escape", () => {
    it("escapes the characters of HTML", () => {
        expect(escape(`"Tom" & <Jerry>`)).toBe("&quot;Tom&quot; &amp; &lt;Jerry&gt;");
    });
});

describe("deckPage", () => {
    const deck = { name: "my-talk", title: "My \"talk\"", description: "About <things>", hasPreview: true };

    it("gives the page the title, the description and the sharing tags of the deck", () => {
        const html = deckPage(PAGE, deck, undefined, "/assets/Deck-1.js");
        expect(html).toContain("<title>My &quot;talk&quot;</title>");
        expect(html).toContain('<meta name="deck" content="my-talk" />');
        expect(html).toContain('<meta name="description" content="About &lt;things&gt;" />');
        expect(html).toContain('<meta property="og:title" content="My &quot;talk&quot;" />');
        expect(html).toContain('<link rel="modulepreload" crossorigin href="/assets/Deck-1.js" />');
        expect(html).toMatch(/<\/head>\n<body>|<\/head>\n {2}<body>/);
    });

    it("links the preview relatively without a site address, absolutely with one", () => {
        expect(deckPage(PAGE, deck, undefined, null)).toContain('<meta property="og:image" content="preview.png" />');
        expect(deckPage(PAGE, deck, "https://example.org/slides", null)).toContain('<meta property="og:image" content="https://example.org/slides/my-talk/preview.png" />');
        expect(deckPage(PAGE, deck, "https://example.org/slides/", null)).toContain('content="https://example.org/slides/my-talk/preview.png"');
        expect(deckPage(PAGE, deck, undefined, null)).toContain('<meta name="twitter:card" content="summary_large_image" />');
    });

    it("leaves the preview tags out when there is no preview", () => {
        const html = deckPage(PAGE, { ...deck, hasPreview: false }, "https://example.org/", null);
        expect(html).not.toContain("og:image");
        expect(html).not.toContain("twitter:card");
        expect(html).not.toContain("modulepreload");
    });
});
