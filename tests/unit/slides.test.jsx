import { describe, expect, it } from 'vitest';
import { Slide, flatten, given, layer, readSlides } from '../../src/interface/slides.js';
import themes from '../../src/components/themes.js';

describe("given", () => {
    it("drops the settings left undefined", () => {
        expect(given({ font: "lora", color: undefined, background: null })).toEqual({ font: "lora", background: null });
    });
});

describe("layer", () => {
    it("lets each layer replace the ones before", () => {
        expect(layer({ font: "sans", color: "black" }, { font: "lora" }, { color: "white" })).toMatchObject({ font: "lora", color: "white" });
    });

    it("merges the corners", () => {
        const settings = layer({ corners: { topLeft: "Deck", bottomRight: "1" } }, { corners: { topRight: "Slide", bottomRight: null } });
        expect(settings.corners).toEqual({ topLeft: "Deck", topRight: "Slide", bottomRight: null });
    });

    it("drops every corner with false, until a later layer gives some again", () => {
        expect(layer({ corners: { topLeft: "Deck" } }, { corners: false }).corners).toBe(false);
        expect(layer({ corners: false }, {}).corners).toBe(false);
        expect(layer({ corners: false }, { corners: { topLeft: "Back" } }).corners).toEqual({ topLeft: "Back" });
    });
});

describe("flatten", () => {
    it("opens the fragments grouping slides", () => {
        const children = flatten([<Slide key="1">One</Slide>, <><Slide>Two</Slide><><Slide>Three</Slide></></>]);
        expect(children.map((child) => child.props.children)).toEqual(["One", "Two", "Three"]);
    });
});

describe("readSlides", () => {
    const deck = layer({ ...themes.light, transition: "fade", corners: {} }, { corners: { topLeft: "Deck" } });

    it("reads the content, notes and settings of each slide", () => {
        const [first, second] = readSlides([
            <Slide key="1" notes="Say hello">Hello</Slide>,
            <Slide key="2" background="gray-800" corners={false} transition="slide">World</Slide>
        ], deck);
        expect(first).toMatchObject({ content: "Hello", notes: "Say hello", background: "white", corners: { topLeft: "Deck" }, transition: "fade" });
        expect(second).toMatchObject({ content: "World", background: "gray-800", corners: {}, transition: "slide" });
    });

    it("lays the theme of a slide under its own props", () => {
        const [slide] = readSlides([<Slide key="1" theme={themes.night} color="amber-300">Night</Slide>], deck);
        expect(slide).toMatchObject({ font: "inter", background: ["slate-900", "indigo-950"], diagramTheme: "dark", color: "amber-300" });
    });

    it("keeps the settings of the deck where a slide leaves them undefined", () => {
        const [slide] = readSlides([<Slide key="1" font={undefined}>Text</Slide>], deck);
        expect(slide.font).toBe("sans");
    });

    it("refuses anything but slides", () => {
        expect(() => readSlides([<div key="1">Not a slide</div>], deck)).toThrow("A Presentation only takes <Slide> elements as children");
        expect(() => readSlides(["text"], deck)).toThrow();
    });
});

describe("themes", () => {
    it("gives every ready theme the same settings", () => {
        const keys = Object.values(themes).map((theme) => Object.keys(theme).filter((key) => key!=="headingFont").sort());
        for (const settings of keys)
            expect(settings).toEqual(keys[0]);
    });
});
