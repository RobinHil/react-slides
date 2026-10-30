import { afterEach, describe, expect, it, vi } from 'vitest';
import { browserLanguage, labels } from '../../src/interface/labels.js';

afterEach(() => {
    vi.restoreAllMocks();
});

/** Sets the preferred languages of the browser. */
function prefer(languages) {
    vi.spyOn(navigator, "languages", "get").mockReturnValue(languages);
}

describe("labels", () => {
    it("has every label in English and in French", () => {
        expect(Object.keys(labels).sort()).toEqual(["en", "fr"]);
        expect(Object.keys(labels.fr).sort()).toEqual(Object.keys(labels.en).sort());
    });

    it("has no empty label", () => {
        for (const language of Object.values(labels))
            for (const label of Object.values(language))
                expect(label.trim()).not.toBe("");
    });
});

describe("browserLanguage", () => {
    it("takes the first preferred language that has labels", () => {
        prefer(["fr-FR", "en-US"]);
        expect(browserLanguage()).toBe("fr");
        prefer(["de-DE", "fr-CA", "en"]);
        expect(browserLanguage()).toBe("fr");
        prefer(["EN-gb"]);
        expect(browserLanguage()).toBe("en");
    });

    it("falls back on English", () => {
        prefer(["de-DE", "ja"]);
        expect(browserLanguage()).toBe("en");
        prefer([]);
        expect(browserLanguage()).toBe("en");
    });
});
