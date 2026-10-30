import { expect, test } from '@playwright/test';
import { DECK_SLIDES, openDeck } from './helpers.js';

/** Waits until a page has loaded its files, a few seconds at most when a player keeps streaming, then its fonts and the content its slide draws, and pauses its videos. */
async function settle(page) {
    await page.waitForLoadState("networkidle", { timeout: 5000 }).catch(() => null);
    await page.evaluate(() => document.fonts.ready);
    await page.waitForTimeout(800);
    await page.evaluate(() => document.querySelectorAll("video").forEach((video) => video.pause()));
}

/** Masks the clock of the presenter view, videos and players being hidden from every screenshot by its style sheet. */
function moving(page) {
    return [page.locator("header > span")];
}

test.describe("visual", () => {
    test.use({ reducedMotion: "reduce" });

    test("home page", async ({ page }) => {
        await page.goto("./");
        await settle(page);
        await expect(page).toHaveScreenshot("home.png", { fullPage: true, mask: moving(page) });
    });

    test("home page in the dark theme", async ({ browser }) => {
        const page = await browser.newPage({ colorScheme: "dark", reducedMotion: "reduce", viewport: { width: 1440, height: 900 } });
        await page.goto("./");
        await settle(page);
        await expect(page).toHaveScreenshot("home-dark.png", { fullPage: true, mask: moving(page) });
        await page.close();
    });

    for (let number = 1; number<=DECK_SLIDES; number++) {
        test(`slide ${number}`, async ({ page }) => {
            await openDeck(page, "demo-en", `#${number}.999`);
            await settle(page);
            await expect(page.locator("[data-slide-viewer]")).toHaveScreenshot(`slide-${String(number).padStart(2, "0")}.png`, { mask: moving(page) });
        });
    }

    test("deck with its toolbar", async ({ page }) => {
        await openDeck(page, "demo-en", "#9");
        await settle(page);
        await expect(page).toHaveScreenshot("deck.png", { mask: moving(page) });
    });

    test("slide list and notes", async ({ page }) => {
        await openDeck(page, "demo-en", "#2");
        await page.keyboard.press("s");
        await page.keyboard.press("n");
        await settle(page);
        await expect(page).toHaveScreenshot("panels.png", { mask: moving(page) });
    });

    test("mosaic", async ({ page }) => {
        await openDeck(page, "demo-en", "#5");
        await page.keyboard.press("m");
        await settle(page);
        await page.waitForTimeout(1000);
        await expect(page).toHaveScreenshot("mosaic.png", { mask: moving(page) });
    });

    test("help", async ({ page }) => {
        await openDeck(page, "demo-en", "#3");
        await page.keyboard.press("?");
        await settle(page);
        await expect(page).toHaveScreenshot("help.png", { mask: moving(page) });
    });

    test("presenter view", async ({ page }) => {
        await page.goto("demo-en/?presenter=visual#13");
        await settle(page);
        await expect(page).toHaveScreenshot("presenter.png", { mask: moving(page) });
    });

    test("starter deck", async ({ page }) => {
        await openDeck(page, "starter", "#1");
        await settle(page);
        await expect(page.locator("[data-slide-viewer]")).toHaveScreenshot("starter.png");
    });
});
