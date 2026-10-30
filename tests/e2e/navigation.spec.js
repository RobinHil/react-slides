import { expect, test } from '@playwright/test';
import { collectErrors, expectPosition, openDeck, position, progress } from './helpers.js';

test.describe("navigation", () => {
    test("moves with the arrows and the keys of a remote", async ({ page }) => {
        const errors = collectErrors(page);
        await openDeck(page);
        await page.keyboard.press("ArrowRight");
        await expectPosition(page, "#2");
        await page.keyboard.press("PageDown");
        await expectPosition(page, "#3");
        await page.keyboard.press("PageUp");
        await expectPosition(page, "#2");
        await page.keyboard.press("ArrowLeft");
        await expectPosition(page, "#1");
        await page.keyboard.press("ArrowLeft");
        await expectPosition(page, "#1");
        expect(errors).toEqual([]);
    });

    test("goes to the first and the last slide", async ({ page }) => {
        await openDeck(page, "demo-en", "#5");
        await page.keyboard.press("ArrowUp");
        await expectPosition(page, "#21");
        await page.keyboard.press("ArrowDown");
        await expectPosition(page, "#1");
        await page.getByRole("button", { name: "Last slide" }).click();
        await expectPosition(page, "#21");
        await page.getByRole("button", { name: "First slide" }).click();
        await expectPosition(page, "#1");
    });

    test("reveals the steps of a slide before moving on, and shows a slide whole when coming back", async ({ page }) => {
        await openDeck(page, "demo-en", "#19");
        await page.keyboard.press("ArrowRight");
        await expectPosition(page, "#20");
        const steps = page.locator("[data-slide-viewer] [data-step]");
        await expect(steps).toHaveCount(4);
        await expect(steps.first()).toHaveAttribute("data-shown", "false");
        for (const step of [1, 2, 3]) {
            await page.keyboard.press("ArrowRight");
            await expectPosition(page, `#20.${step}`);
        }
        await expect(steps.nth(2)).toHaveAttribute("data-shown", "true");
        await expect(steps.nth(3)).toHaveAttribute("data-shown", "true");
        await page.keyboard.press("ArrowRight");
        await expectPosition(page, "#21");
        await page.keyboard.press("ArrowLeft");
        await expectPosition(page, "#20.3");
        await page.keyboard.press("ArrowLeft");
        await expectPosition(page, "#20.2");
    });

    test("moves the progress bar at each slide and each step", async ({ page }) => {
        await openDeck(page, "demo-en", "#1");
        expect(await progress(page)).toBe(5);
        await openDeck(page, "demo-en", "#20");
        await expect.poll(() => progress(page)).toBe(92);
        await page.keyboard.press("ArrowRight");
        await expect.poll(() => progress(page)).toBe(93);
        await openDeck(page, "demo-en", "#21");
        await expect.poll(() => progress(page)).toBe(100);
    });

    test("opens at the position of the address, bounded by the deck", async ({ page }) => {
        await openDeck(page, "demo-en", "#20.2");
        await expect(page.locator("[data-slide-viewer] [data-step]").nth(1)).toHaveAttribute("data-shown", "true");
        await expect(page.locator("[data-slide-viewer] [data-step]").nth(2)).toHaveAttribute("data-shown", "false");
        await openDeck(page, "demo-en", "#99");
        await expectPosition(page, "#21");
        await openDeck(page, "demo-en", "#0");
        await expectPosition(page, "#1");
        await page.reload();
        await expectPosition(page, "#1");
    });

    test("goes to a typed number on Enter or on leaving the field, and cancels on Escape", async ({ page }) => {
        await openDeck(page, "demo-en", "#5");
        await page.keyboard.press("1");
        await page.keyboard.type("2");
        await page.waitForTimeout(200);
        expect(await position(page)).toBe("#5");
        await page.keyboard.press("Enter");
        await expectPosition(page, "#12");
        await page.keyboard.press("7");
        await page.keyboard.press("Escape");
        await page.waitForTimeout(200);
        expect(await position(page)).toBe("#12");
        await page.keyboard.press("7");
        await page.locator("[data-slide-viewer]").click({ position: { x: 5, y: 5 } });
        await expectPosition(page, "#7");
        await page.getByRole("textbox", { name: "Slide number" }).fill("99");
        await page.keyboard.press("Enter");
        await expectPosition(page, "#21");
    });

    test("keeps every quick click on the buttons, transitions included", async ({ page }) => {
        await openDeck(page, "demo-en", "#1");
        const next = await page.getByRole("button", { name: "Next slide" }).boundingBox();
        for (let click = 0; click<8; click++) {
            await page.mouse.click(next.x+next.width/2, next.y+next.height/2);
            await page.waitForTimeout(60);
        }
        await expectPosition(page, "#9");
    });

    test("comes back to the home page", async ({ page }) => {
        await openDeck(page, "demo-en", "#3");
        await page.keyboard.press("h");
        await expect(page).toHaveURL(/\/react-slides\/$/);
    });
});
