import { expect, test } from '@playwright/test';
import { DECK_SLIDES, openDeck } from './helpers.js';

/** Replaces the print dialog by a counter, the deck staying laid out for print. */
function stubPrint(page) {
    return page.addInitScript(() => {
        window.printCount = 0;
        window.print = () => {
            window.printCount++;
        };
    });
}

test.describe("PDF export", () => {
    test("lays out every slide at full size, one per page, then opens the print dialog", async ({ page }) => {
        await stubPrint(page);
        await openDeck(page, "demo-en", "#3");
        await page.getByRole("button", { name: "Export PDF" }).click();
        await expect.poll(() => page.evaluate(() => window.printCount), { timeout: 30000 }).toBe(1);
        const pages = page.locator(".break-after-page");
        await expect(pages).toHaveCount(DECK_SLIDES);
        const sizes = await pages.evaluateAll((elements) => elements.map((element) => `${element.offsetWidth}x${element.offsetHeight}`));
        expect(new Set(sizes)).toEqual(new Set(["1920x1080"]));
        expect(await page.locator(".break-after-page img").evaluateAll((images) => images.every((image) => image.complete && image.naturalWidth>0))).toBe(true);
        expect(await page.locator(".break-after-page iframe").count()).toBe(0);
        expect(await page.locator(".break-after-page [data-step]").evaluateAll((steps) => steps.every((step) => step.dataset.shown==="true"))).toBe(true);
    });

    test("prints from Ctrl+P as from the button", async ({ page }) => {
        await stubPrint(page);
        await openDeck(page, "demo-en", "#3");
        await page.keyboard.press("Control+p");
        await expect.poll(() => page.evaluate(() => window.printCount), { timeout: 30000 }).toBe(1);
        await page.keyboard.press("p");
        await page.waitForTimeout(500);
        expect(await page.evaluate(() => window.printCount)).toBe(1);
    });

    test("writes a PDF of one page per slide, with its links", async ({ page, browserName }) => {
        test.skip(browserName!=="chromium", "Only Chromium writes PDF files from Playwright");
        test.slow();
        await stubPrint(page);
        await openDeck(page, "demo-en", "#3");
        await page.keyboard.press("p");
        await expect.poll(() => page.evaluate(() => window.printCount), { timeout: 30000 }).toBe(1);
        await page.emulateMedia({ media: "print" });
        const pdf = (await page.pdf({ preferCSSPageSize: true, printBackground: true })).toString("latin1");
        expect(pdf.match(/\/Type\s*\/Page\b(?!s)/g)).toHaveLength(DECK_SLIDES);
        const links = [...pdf.matchAll(/\/URI\s*\(([^)]*)\)/g)].map((match) => match[1]);
        expect(links).toContain("https://google.com/");
        expect(links.some((link) => link.includes("youtube.com") || link.includes("youtu.be"))).toBe(true);
        expect(pdf).toContain("/MediaBox [0 0 1440 810]");
    });
});
