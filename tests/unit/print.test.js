import { describe, expect, it } from 'vitest';
import { SHADOW_LAYERS, shadowLayers, sharpen } from '../../src/interface/print.js';

describe("shadowLayers", () => {
    it("splits shadows without splitting the commas of their colors", () => {
        expect(shadowLayers("rgba(0, 0, 0, 0.1) 0px 1px 3px 0px, rgb(0, 0, 0) 0px 0px 0px 1px")).toEqual(["rgba(0, 0, 0, 0.1) 0px 1px 3px 0px", "rgb(0, 0, 0) 0px 0px 0px 1px"]);
    });
});

describe("sharpen", () => {
    it("redraws a blurred shadow as sharp layers of growing spread", () => {
        const layers = sharpen("rgba(0, 0, 0, 0.25) 0px 25px 50px -12px");
        expect(layers).toHaveLength(SHADOW_LAYERS);
        expect(layers.every((layer) => layer.includes(" 0px 25px 0px "))).toBe(true);
        const spreads = layers.map((layer) => Number(/0px (-?[\d.]+)px$/.exec(layer)[1]));
        expect(spreads[0]).toBe(-37);
        expect(spreads.at(-1)).toBe(13);
        expect(spreads).toEqual([...spreads].sort((a, b) => a-b));
        expect(layers[0]).toContain(`color-mix(in srgb, rgba(0, 0, 0, 0.25) ${100/SHADOW_LAYERS}%, transparent)`);
    });

    it("keeps sharp and unknown shadows as they are", () => {
        expect(sharpen("rgb(0, 0, 0) 0px 0px 0px 1px")).toEqual(["rgb(0, 0, 0) 0px 0px 0px 1px"]);
        expect(sharpen("inset rgb(0, 0, 0) 0px 0px 4px 1px")).toEqual(["inset rgb(0, 0, 0) 0px 0px 4px 1px"]);
        expect(sharpen("rgb(0, 0, 0) 0px 0px 4px 1px inset")).toEqual(["rgb(0, 0, 0) 0px 0px 4px 1px inset"]);
    });
});
