import { afterEach, describe, expect, it } from 'vitest';
import { clamp, readHash, writeHash } from '../../src/contexts/position.js';

afterEach(() => {
    history.replaceState(null, "", "#");
});

describe("readHash", () => {
    it("reads a slide, and a step when there is one", () => {
        history.replaceState(null, "", "#7");
        expect(readHash()).toEqual({ slide: 7, step: 0 });
        history.replaceState(null, "", "#7.2");
        expect(readHash()).toEqual({ slide: 7, step: 2 });
    });

    it("reads no position from an empty or foreign address", () => {
        history.replaceState(null, "", "#");
        expect(readHash()).toBeNull();
        history.replaceState(null, "", "#intro");
        expect(readHash()).toBeNull();
    });

    it("ignores a step that is not a number", () => {
        history.replaceState(null, "", "#7.x");
        expect(readHash()).toEqual({ slide: 7, step: 0 });
    });
});

describe("writeHash", () => {
    it("leaves the step out at the start of a slide", () => {
        writeHash(4, 0, 3);
        expect(location.hash).toBe("#4");
    });

    it("writes the step, bounded by the steps of the slide", () => {
        writeHash(4, 2, 3);
        expect(location.hash).toBe("#4.2");
        writeHash(4, Infinity, 3);
        expect(location.hash).toBe("#4.3");
        writeHash(4, Infinity, 0);
        expect(location.hash).toBe("#4");
    });

    it("does not add an entry to the history", () => {
        const length = history.length;
        writeHash(5, 1, 2);
        writeHash(6, 0, 0);
        expect(history.length).toBe(length);
    });
});

describe("clamp", () => {
    it("keeps a slide number within the deck", () => {
        expect(clamp(0, 10)).toBe(1);
        expect(clamp(-3, 10)).toBe(1);
        expect(clamp(5, 10)).toBe(5);
        expect(clamp(42, 10)).toBe(10);
    });
});
