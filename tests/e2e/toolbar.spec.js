import { expect, test } from '@playwright/test';
import { isDialogOpen, measureToolbar, openDeck } from './helpers.js';

const WIDTHS = [320, 360, 390, 430, 480, 540, 600, 640, 700, 768, 820, 900, 1024, 1180, 1280, 1366, 1440, 1600, 1920];
const HEIGHTS = [400, 700, 1000];
const TOGGLES = ["s", "m", "n", "b"];

/** Finds the control a keyboard shortcut belongs to, shown or not. */
function control(page, key) {
    return page.locator(`[aria-keyshortcuts~="${key}" i]`);
}

test.describe("toolbar", () => {
    test("keeps the navigation in the exact middle at every size, without overflowing", async ({ page }) => {
        test.slow();
        await openDeck(page, "demo-en", "#3");
        const problems = [];
        for (const height of HEIGHTS) {
            for (const width of WIDTHS) {
                await page.setViewportSize({ width, height });
                await page.waitForTimeout(50);
                const measure = await measureToolbar(page);
                if (Math.abs(measure.offset)>1 || measure.overflow || measure.pageScroll)
                    problems.push({ width, height, ...measure });
            }
        }
        expect(problems).toEqual([]);
    });

    test("keeps the navigation in the middle in full screen too", async ({ page }) => {
        for (const width of [390, 700, 1024, 1440]) {
            await page.setViewportSize({ width, height: 800 });
            await openDeck(page, "demo-en", "#3");
            await page.keyboard.press("f");
            await expect(page.getByRole("button", { name: "Exit full screen", includeHidden: true })).toHaveCount(1);
            await page.waitForTimeout(100);
            const measure = await measureToolbar(page);
            expect(Math.abs(measure.offset), `offset at ${width}`).toBeLessThanOrEqual(1);
            expect(measure.overflow, `overflow at ${width}`).toBe(false);
            await page.keyboard.press("f");
            await expect(page.getByRole("button", { name: "Full screen" })).toBeVisible();
        }
    });

    test("shows every control on a wide screen, grouped as displays on the left and actions on the right", async ({ page }) => {
        await openDeck(page, "demo-en", "#3");
        const labels = await page.locator(".flow-root .grid > .justify-self-start, .flow-root .grid > .justify-self-end").evaluateAll((sides) => sides.map((side) => [...side.querySelectorAll("[aria-label]")].filter((element) => element.checkVisibility()).map((element) => element.ariaLabel)));
        expect(labels).toEqual([
            ["All presentations", "Show all slides", "Show mosaic", "Show notes", "Hide progress bar"],
            ["Export PDF", "Presenter view", "Full screen", "Keyboard shortcuts"]
        ]);
    });

    test("only answers the shortcuts of the buttons shown", async ({ page }) => {
        test.slow();
        await openDeck(page, "demo-en", "#3");
        for (const width of [360, 520, 640, 900, 1440]) {
            await page.setViewportSize({ width, height: 800 });
            await page.waitForTimeout(100);
            for (const key of TOGGLES) {
                const button = control(page, key);
                const isShown = await button.isVisible();
                const before = await button.getAttribute("aria-label");
                await page.keyboard.press(key);
                await page.waitForTimeout(100);
                const after = await button.getAttribute("aria-label");
                expect(after!==before, `${key} at ${width}`).toBe(isShown);
                if (after!==before)
                    await page.keyboard.press(key==="m" ? "Escape" : key);
                await expect(button).toHaveAttribute("aria-label", before);
            }
            const help = await control(page, "?").isVisible();
            await page.keyboard.press("?");
            await page.waitForTimeout(100);
            expect(await isDialogOpen(page, "Keyboard shortcuts"), `? at ${width}`).toBe(help);
            if (help)
                await page.keyboard.press("Escape");
        }
    });

    test("lists in the help only the shortcuts of the buttons shown", async ({ page }) => {
        await openDeck(page, "demo-en", "#3");
        await page.keyboard.press("?");
        const help = page.getByRole("dialog", { name: "Keyboard shortcuts" });
        await expect(help.locator("li")).toHaveCount(13);
        for (const text of ["List of the slides", "Notes", "Progress bar", "Presenter view", "All presentations"])
            await expect(help.getByText(text, { exact: true })).toBeVisible();
        await page.keyboard.press("Escape");
        await page.setViewportSize({ width: 560, height: 800 });
        await page.keyboard.press("?");
        await expect(help.locator("li")).toHaveCount(8);
        for (const text of ["First or last slide", "List of the slides", "Notes", "Progress bar", "Presenter view"])
            await expect(help.getByText(text, { exact: true })).toHaveCount(0);
    });

    test("shows a tooltip with the shortcut once the mouse rests on a button", async ({ page }) => {
        await openDeck(page, "demo-en", "#3");
        const tooltip = page.getByRole("button", { name: "Show mosaic" }).locator("xpath=following-sibling::div");
        await expect(tooltip).toBeHidden();
        await page.getByRole("button", { name: "Show mosaic" }).hover();
        await expect(tooltip).toBeVisible();
        await expect(tooltip).toHaveText("Show mosaicM");
        await page.getByRole("button", { name: "Previous slide" }).hover();
        await expect(tooltip).toBeHidden();
        await expect(page.getByRole("button", { name: "Previous slide" }).locator("xpath=following-sibling::div")).toHaveText("Previous slide←");
    });

    test("leaves the shortcuts to the browser with a modifier key", async ({ page }) => {
        await openDeck(page, "demo-en", "#3");
        await page.keyboard.press("Alt+m");
        await page.waitForTimeout(200);
        expect(await isDialogOpen(page, "Mosaic")).toBe(false);
    });
});
