import { describe, expect, it } from 'vitest';
import { backgroundStyle, cssColor, flexPosition, fontSizeStyle, fontStyle, fraction, gradientColorAt, isGradient, listType, textGradientStyle, textStyle } from '../../src/components/styles.js';

describe("cssColor", () => {
    it("turns a palette name into its theme variable, falling back to the name", () => {
        expect(cssColor("sky-500")).toBe("var(--color-sky-500, sky-500)");
        expect(cssColor("white")).toBe("var(--color-white, white)");
    });

    it("keeps any other CSS color", () => {
        expect(cssColor("#ff8800")).toBe("#ff8800");
        expect(cssColor("rgb(1, 2, 3)")).toBe("rgb(1, 2, 3)");
    });
});

describe("isGradient", () => {
    it("tells arrays and objects from plain colors", () => {
        expect(isGradient(["sky-100", "violet-200"])).toBe(true);
        expect(isGradient({ colors: ["sky-100", "violet-200"], angle: 90 })).toBe(true);
        expect(isGradient("sky-100")).toBe(false);
        expect(isGradient(null)).toBe(false);
        expect(isGradient(undefined)).toBe(false);
    });
});

describe("backgroundStyle", () => {
    it("paints nothing without a paint", () => {
        expect(backgroundStyle(undefined)).toEqual({});
    });

    it("paints a plain color", () => {
        expect(backgroundStyle("gray-800")).toEqual({ background: "var(--color-gray-800, gray-800)" });
    });

    it("paints a diagonal gradient by default", () => {
        expect(backgroundStyle(["sky-100", "#ffffff"])).toEqual({ background: "linear-gradient(135deg, var(--color-sky-100, sky-100), #ffffff)" });
    });

    it("paints a gradient at a given angle", () => {
        expect(backgroundStyle({ colors: ["red-500", "blue-500"], angle: 90 })).toEqual({ background: "linear-gradient(90deg, var(--color-red-500, red-500), var(--color-blue-500, blue-500))" });
    });
});

describe("textStyle", () => {
    it("colors a text with a plain color only", () => {
        expect(textStyle("rose-600")).toEqual({ color: "var(--color-rose-600, rose-600)" });
        expect(textStyle(["sky-500", "violet-600"])).toEqual({});
        expect(textStyle(undefined)).toEqual({});
    });
});

describe("textGradientStyle", () => {
    it("clips a gradient to the text", () => {
        const style = textGradientStyle(["sky-500", "violet-600"]);
        expect(style.backgroundImage).toBe("linear-gradient(135deg, var(--color-sky-500, sky-500), var(--color-violet-600, violet-600))");
        expect(style.backgroundClip).toBe("text");
        expect(style.color).toBe("transparent");
    });
});

describe("gradientColorAt", () => {
    it("mixes the two colors around a fraction", () => {
        expect(gradientColorAt(["red-500", "blue-500"], 0)).toBe("color-mix(in oklab, var(--color-red-500, red-500), var(--color-blue-500, blue-500) 0%)");
        expect(gradientColorAt(["red-500", "blue-500"], 1)).toBe("color-mix(in oklab, var(--color-red-500, red-500), var(--color-blue-500, blue-500) 100%)");
    });

    it("walks along the colors of a longer gradient", () => {
        expect(gradientColorAt(["a", "b", "c"], 0.75)).toBe("color-mix(in oklab, var(--color-b, b), var(--color-c, c) 50%)");
    });

    it("reads the gradient backward when it runs from right to left", () => {
        expect(gradientColorAt({ colors: ["a", "b"], angle: 270 }, 0)).toBe("color-mix(in oklab, var(--color-a, a), var(--color-b, b) 100%)");
    });
});

describe("fontSizeStyle", () => {
    it("sets a Tailwind size with its line height", () => {
        expect(fontSizeStyle("4xl")).toEqual({ fontSize: "var(--text-4xl, 4xl)", lineHeight: "var(--text-4xl--line-height, normal)" });
    });

    it("keeps any other CSS size", () => {
        expect(fontSizeStyle("1.5rem")).toEqual({ fontSize: "1.5rem" });
        expect(fontSizeStyle("calc(1rem + 2vw)")).toEqual({ fontSize: "calc(1rem + 2vw)" });
    });

    it("falls back on a plain size written like a Tailwind name", () => {
        expect(fontSizeStyle("3rem")).toEqual({ fontSize: "var(--text-3rem, 3rem)", lineHeight: "var(--text-3rem--line-height, normal)" });
    });

    it("sets nothing without a size", () => {
        expect(fontSizeStyle(undefined)).toEqual({});
    });
});

describe("fontStyle", () => {
    it("sets a font of the theme or any family", () => {
        expect(fontStyle("lora")).toEqual({ fontFamily: "var(--font-lora, lora)" });
        expect(fontStyle("\"Comic Sans MS\", cursive")).toEqual({ fontFamily: "\"Comic Sans MS\", cursive" });
        expect(fontStyle(undefined)).toEqual({});
    });
});

describe("fraction", () => {
    it("turns a fraction into a product of a length", () => {
        expect(fraction("1/3", "100%")).toBe("100% * 1 / 3");
        expect(fraction("2/3", "var(--frame-height)")).toBe("var(--frame-height) * 2 / 3");
    });
});

describe("flexPosition", () => {
    it("turns edges into flex positions and keeps center", () => {
        expect(flexPosition("left")).toBe("flex-start");
        expect(flexPosition("top")).toBe("flex-start");
        expect(flexPosition("right")).toBe("flex-end");
        expect(flexPosition("bottom")).toBe("flex-end");
        expect(flexPosition("center")).toBe("center");
    });
});

describe("listType", () => {
    it("has bulleted and numbered lists", () => {
        expect(Object.keys(listType).sort()).toEqual(["bulleted", "numbered"]);
    });
});
