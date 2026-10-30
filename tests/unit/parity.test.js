import { describe, expect, it } from 'vitest';
import { existsSync, readFileSync, readdirSync } from 'node:fs';
import { dirname, join, relative, resolve } from 'node:path';
import { isValidElement } from 'react';
import fr from '../../src/decks/demo/text/fr.jsx';
import en from '../../src/decks/demo/text/en.jsx';

const DOCS = resolve(import.meta.dirname, "../../docs");

/** Describes the shape of a value, leaving out its words, to compare two translations. */
function shape(value) {
    if (Array.isArray(value))
        return value.map(shape);
    if (isValidElement(value))
        return "element";
    if (typeof value==="function")
        return `function(${value.length})`;
    if (value && typeof value==="object")
        return Object.fromEntries(Object.keys(value).sort().map((key) => [key, shape(value[key])]));
    return typeof value;
}

/** Lists the Markdown pages of one language of the user guide. */
function pages(language) {
    return readdirSync(join(DOCS, language), { recursive: true }).filter((file) => file.endsWith(".md")).sort();
}

/** Lists the pictures a page of the user guide shows, outside of its code blocks, relative to its language folder. */
function pictures(language, page) {
    const text = readFileSync(join(DOCS, language, page), "utf8").replace(/```[\s\S]*?```/g, "");
    return [...text.matchAll(/!\[[^\]]*\]\(([^)]+)\)/g)].map(([, src]) => relative(join(DOCS, language), resolve(join(DOCS, language), dirname(page), src)));
}

describe("demo deck texts", () => {
    it("has the same texts in English and in French", () => {
        expect(shape(en)).toEqual(shape(fr));
    });

    it("has the same number of slides in both summaries", () => {
        expect(en.summary.parts).toHaveLength(fr.summary.parts.length);
        expect(en.summary.parts.length).toBe(17);
    });
});

describe("user guide", () => {
    it("has the same pages in English and in French", () => {
        expect(pages("fr")).toEqual(pages("en"));
    });

    it("shows the same pictures in both languages, all of them taken", () => {
        for (const page of pages("en")) {
            expect(pictures("fr", page), page).toEqual(pictures("en", page));
            for (const picture of pictures("en", page)) {
                expect(existsSync(join(DOCS, "en", picture)), `${page}: ${picture}`).toBe(true);
                expect(existsSync(join(DOCS, "fr", picture)), `${page}: ${picture}`).toBe(true);
            }
        }
    });

    it("lists the same pages in the navigation of both languages", () => {
        const navigation = (language) => [...readFileSync(join(DOCS, `mkdocs.${language}.yml`), "utf8").matchAll(/^\s*- (?:[^:\n]+: )?([\w/-]+\.md)$/gm)].map(([, page]) => page);
        expect(navigation("fr")).toEqual(navigation("en"));
        expect(navigation("en").sort()).toEqual(pages("en"));
    });
});
