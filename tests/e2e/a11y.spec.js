import AxeBuilder from '@axe-core/playwright';
import { expect, test } from '@playwright/test';
import { openDeck } from './helpers.js';

/** Lists the serious and critical accessibility problems of the interface, the slides and their thumbnails left to the authors of the decks. */
async function audit(page) {
    const results = await new AxeBuilder({ page }).exclude("[data-slide-viewer]").exclude("button:has(> [inert][aria-hidden=true])").analyze();
    return results.violations.filter((violation) => ["serious", "critical"].includes(violation.impact)).map((violation) => ({ id: violation.id, targets: violation.nodes.map((node) => node.target.join(" ")) }));
}

test.describe("accessibility", () => {
    for (const colorScheme of ["light", "dark"]) {
        test.describe(`in the ${colorScheme} theme`, () => {
            test.use({ colorScheme });

            test("has no serious problem on the home page", async ({ page }) => {
                await page.goto("./");
                await expect(page.locator("main a[href='starter/']")).toBeVisible();
                expect(await audit(page)).toEqual([]);
            });

            test("has no serious problem around a deck, its panels and dialogs", async ({ page }) => {
                await openDeck(page, "demo-en", "#2");
                expect(await audit(page)).toEqual([]);
                await page.keyboard.press("s");
                await page.keyboard.press("n");
                await page.waitForTimeout(700);
                expect(await audit(page)).toEqual([]);
                await page.keyboard.press("s");
                await page.keyboard.press("n");
                await page.keyboard.press("m");
                await page.waitForTimeout(700);
                expect(await audit(page)).toEqual([]);
                await page.keyboard.press("Escape");
                await page.keyboard.press("?");
                await page.waitForTimeout(700);
                expect(await audit(page)).toEqual([]);
            });

            test("has no serious problem in the presenter view", async ({ page }) => {
                await page.goto("demo-en/?presenter=audit#2");
                await expect(page.locator("header")).toBeVisible();
                expect(await audit(page)).toEqual([]);
            });
        });
    }

    test("can be driven from the keyboard alone", async ({ page }) => {
        await openDeck(page, "demo-en", "#3");
        await page.keyboard.press("Tab");
        await expect(page.getByRole("link", { name: "All presentations" })).toBeFocused();
        await expect(page.getByRole("link", { name: "All presentations" })).toHaveCSS("box-shadow", /rgb/);
        const focused = [];
        for (let press = 0; press<16; press++) {
            focused.push(await page.evaluate(() => document.activeElement.ariaLabel));
            await page.keyboard.press("Tab");
        }
        expect(focused).toEqual(expect.arrayContaining(["Show mosaic", "Previous slide", "Slide number", "Next slide", "Export PDF", "Full screen", "Keyboard shortcuts"]));
        await page.getByRole("button", { name: "Next slide" }).focus();
        await page.keyboard.press("Enter");
        await expect.poll(() => page.evaluate(() => location.hash)).toBe("#4");
    });
});
