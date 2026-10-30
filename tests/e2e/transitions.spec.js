import { expect, test } from '@playwright/test';
import { expectPosition, openDeck } from './helpers.js';

/** Starts recording the animations the slide of a view transition plays. */
function recordAnimations(page) {
    return page.evaluate(() => {
        window.slideAnimations = [];
        document.addEventListener("animationstart", (event) => {
            if (event.pseudoElement.includes("(slide)"))
                window.slideAnimations.push(event.animationName);
        }, true);
    });
}

/** Lists the animations the slide played since the recording started. */
function slideAnimations(page) {
    return page.evaluate(() => window.slideAnimations);
}

test.describe("transitions", () => {
    test("fades between slides, scoped to the slide where the browser can", async ({ page }) => {
        await openDeck(page, "demo-en", "#3");
        test.skip(!await page.evaluate(() => Boolean(document.startViewTransition)), "No view transitions in this browser");
        await recordAnimations(page);
        await page.keyboard.press("ArrowRight");
        await expect.poll(() => slideAnimations(page)).toContain("fade-in");
        await expectPosition(page, "#4");
        const scoped = await page.evaluate(() => Boolean(HTMLElement.prototype.startViewTransition));
        expect(await page.evaluate(() => document.documentElement.classList.contains("slide-new:animate-fade-in"))).toBe(!scoped);
    });

    test("falls back on the whole page without scoped transitions", async ({ page }) => {
        await page.addInitScript(() => {
            delete HTMLElement.prototype.startViewTransition;
            delete Element.prototype.startViewTransition;
        });
        await openDeck(page, "demo-en", "#3");
        test.skip(!await page.evaluate(() => Boolean(document.startViewTransition)), "No view transitions in this browser");
        await expect(page.locator("html")).toHaveClass(/slide-new:animate-fade-in/);
        await recordAnimations(page);
        await page.keyboard.press("ArrowRight");
        await expect.poll(() => slideAnimations(page)).toContain("fade-in");
    });

    test("jumps without transition from the slide number", async ({ page }) => {
        await openDeck(page, "demo-en", "#3");
        await recordAnimations(page);
        await page.getByRole("textbox", { name: "Slide number" }).fill("10");
        await page.keyboard.press("Enter");
        await expectPosition(page, "#10");
        expect(await slideAnimations(page)).toEqual([]);
    });

    test("plays nothing when the system asks for less motion", async ({ browser }) => {
        const page = await browser.newPage({ reducedMotion: "reduce" });
        await openDeck(page, "demo-en", "#3");
        await recordAnimations(page);
        await page.keyboard.press("ArrowRight");
        await expectPosition(page, "#4");
        expect(await slideAnimations(page)).toEqual([]);
        await page.close();
    });
});
