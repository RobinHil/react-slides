import { expect, test } from '@playwright/test';
import { expectPosition, measureToolbar, openDeck } from './helpers.js';

/** Tells whether the toolbar is drawn in sight. */
function isToolbarShown(page) {
    return page.locator(".flow-root").first().evaluate((toolbar) => getComputedStyle(toolbar).opacity==="1" && toolbar.getBoundingClientRect().top>=0);
}

test.describe("full screen", () => {
    test("keeps only what presenting needs, the navigation still in the middle", async ({ page }) => {
        await openDeck(page, "demo-en", "#3");
        await page.keyboard.press("f");
        await expect.poll(() => page.evaluate(() => Boolean(document.fullscreenElement))).toBe(true);
        for (const name of ["All presentations", "Show mosaic", "Show notes", "Export PDF", "Presenter view"])
            await expect(page.getByRole("button", { name, includeHidden: true }).or(page.getByRole("link", { name, includeHidden: true }))).toHaveCount(0);
        for (const key of ["m", "n", "p", "v", "h"])
            await expect(page.locator(`[aria-keyshortcuts~="${key}"]`)).toHaveCount(0);
        const measure = await measureToolbar(page);
        expect(Math.abs(measure.offset)).toBeLessThanOrEqual(1);
        await page.keyboard.press("ArrowRight");
        await expectPosition(page, "#4");
        await page.keyboard.press("f");
        await expect.poll(() => page.evaluate(() => Boolean(document.fullscreenElement))).toBe(false);
        await expect(page.getByRole("button", { name: "Export PDF" })).toBeVisible();
    });

    test("hides the bars until the mouse reaches the top or the left edge", async ({ page }) => {
        await openDeck(page, "demo-en", "#3");
        await page.mouse.move(720, 450);
        await page.keyboard.press("f");
        await expect.poll(() => isToolbarShown(page)).toBe(false);
        await page.mouse.move(720, 10, { steps: 4 });
        await expect.poll(() => isToolbarShown(page)).toBe(true);
        await expect(page.getByRole("button", { name: "Slide 3" })).toBeVisible();
        await page.mouse.move(720, 450, { steps: 4 });
        await expect.poll(() => isToolbarShown(page)).toBe(false);
        await page.mouse.move(5, 450, { steps: 4 });
        await expect.poll(() => isToolbarShown(page)).toBe(true);
        await page.getByRole("button", { name: "Slide 7" }).click();
        await expectPosition(page, "#7");
        await page.mouse.move(720, 450, { steps: 4 });
        await expect.poll(() => isToolbarShown(page)).toBe(false);
    });

    test("leaves full screen with Escape", async ({ page }) => {
        await openDeck(page, "demo-en", "#3");
        await page.keyboard.press("f");
        await expect.poll(() => page.evaluate(() => Boolean(document.fullscreenElement))).toBe(true);
        await page.keyboard.press("Escape");
        await expect(page.getByRole("button", { name: "Full screen" })).toBeVisible();
    });
});
