import { expect, test } from '@playwright/test';
import { DECK_SLIDES, expectPosition, isDialogOpen, openDeck, progress } from './helpers.js';

test.describe("panels", () => {
    test("lists the slides beside the slide and moves to the one picked", async ({ page }) => {
        await openDeck(page, "demo-en", "#3");
        await page.getByRole("button", { name: "Show all slides" }).click();
        const thumbnails = page.getByRole("button", { name: /^Slide \d+$/ });
        await expect(thumbnails).toHaveCount(DECK_SLIDES);
        await expect(page.getByRole("button", { name: "Slide 3" })).toHaveAttribute("aria-current", "true");
        await page.getByRole("button", { name: "Slide 6" }).click();
        await expectPosition(page, "#6");
        await expect(page.getByRole("button", { name: "Slide 6" })).toHaveAttribute("aria-current", "true");
        await expect(page.getByRole("button", { name: "Hide all slides" })).toBeVisible();
        await page.keyboard.press("s");
        await expect(page.getByRole("button", { name: "Show all slides" })).toBeVisible();
        expect(await page.getByRole("button", { name: "Slide 6" }).evaluate((button) => Boolean(button.closest("[inert]")))).toBe(true);
    });

    test("draws the thumbnails near the visible part of the list only", async ({ page }) => {
        await openDeck(page, "demo-en", "#1");
        await page.keyboard.press("s");
        const drawn = () => page.getByRole("button", { name: /^Slide \d+$/ }).evaluateAll((buttons) => buttons.filter((button) => button.querySelector("[inert]")?.childElementCount>0).length);
        await expect.poll(drawn).toBeGreaterThan(0);
        expect(await drawn()).toBeLessThan(DECK_SLIDES);
        await page.getByRole("button", { name: "Slide 21" }).scrollIntoViewIfNeeded();
        await expect.poll(async () => page.getByRole("button", { name: "Slide 21" }).evaluate((button) => button.querySelector("[inert]").childElementCount)).toBeGreaterThan(0);
    });

    test("opens the mosaic over the deck, moves to the slide picked and closes", async ({ page }) => {
        await openDeck(page, "demo-en", "#3");
        expect(await isDialogOpen(page, "Mosaic")).toBe(false);
        await page.keyboard.press("m");
        await expect.poll(() => isDialogOpen(page, "Mosaic")).toBe(true);
        const mosaic = page.getByRole("dialog", { name: "Mosaic" });
        await expect(mosaic.getByRole("button", { name: /^Slide \d+$/ })).toHaveCount(DECK_SLIDES);
        await mosaic.getByRole("button", { name: "Slide 14" }).click();
        await expectPosition(page, "#14");
        await expect.poll(() => isDialogOpen(page, "Mosaic")).toBe(false);
        await page.keyboard.press("m");
        await expect.poll(() => isDialogOpen(page, "Mosaic")).toBe(true);
        await page.keyboard.press("Escape");
        await expect.poll(() => isDialogOpen(page, "Mosaic")).toBe(false);
    });

    test("shows the notes of the current slide, following it", async ({ page }) => {
        await openDeck(page, "demo-en", "#2");
        await page.keyboard.press("n");
        const notes = page.getByLabel("Notes", { exact: true });
        await expect(notes).toContainText("Slide 2 / 21");
        await expect(notes.getByRole("heading", { name: "The plan" })).toBeVisible();
        await expect(notes.getByRole("table")).toBeVisible();
        await page.keyboard.press("ArrowRight");
        await expect(notes).toContainText("No notes for this slide.");
        await page.goto("demo-en/#13");
        await page.keyboard.press("n");
        await expect(notes.getByRole("checkbox")).toHaveCount(4);
        await expect(notes.getByRole("link", { name: "React documentation" })).toHaveAttribute("target", "_blank");
        await page.goto("demo-en/#18");
        await page.keyboard.press("n");
        await expect(notes.locator(".katex")).toHaveCount(1);
        await expect(notes.locator("svg[id^=mermaid], svg[aria-roledescription]")).toHaveCount(1);
    });

    test("hides and shows the progress bar", async ({ page }) => {
        await openDeck(page, "demo-en", "#3");
        await expect(page.getByRole("progressbar")).toBeVisible();
        expect(await progress(page)).toBe(14);
        await page.keyboard.press("b");
        await expect(page.getByRole("progressbar")).toBeHidden();
        await page.getByRole("button", { name: "Show progress bar" }).click();
        await expect(page.getByRole("progressbar")).toBeVisible();
    });

    test("opens the help on the question mark, holds the keys while open and closes in every way", async ({ page }) => {
        await openDeck(page, "demo-en", "#3");
        await page.getByRole("button", { name: "Keyboard shortcuts" }).click();
        await expect.poll(() => isDialogOpen(page, "Keyboard shortcuts")).toBe(true);
        await expect(page.getByRole("dialog", { name: "Keyboard shortcuts" })).toBeFocused();
        await page.keyboard.press("Escape");
        await page.keyboard.press("m");
        await expect(page.getByRole("dialog", { name: "Mosaic" })).toBeFocused();
        await page.keyboard.press("Escape");
        await page.keyboard.press("?");
        await expect(page.getByRole("dialog", { name: "Keyboard shortcuts" })).toBeFocused();
        await page.keyboard.press("ArrowRight");
        await page.keyboard.press("m");
        await expectPosition(page, "#3");
        expect(await isDialogOpen(page, "Mosaic")).toBe(false);
        await page.keyboard.press("?");
        await expect.poll(() => isDialogOpen(page, "Keyboard shortcuts")).toBe(false);
        await page.keyboard.press("?");
        await expect.poll(() => isDialogOpen(page, "Keyboard shortcuts")).toBe(true);
        await page.mouse.click(10, 450);
        await expect.poll(() => isDialogOpen(page, "Keyboard shortcuts")).toBe(false);
        await page.keyboard.press("?");
        await page.getByRole("dialog", { name: "Keyboard shortcuts" }).getByRole("button", { name: "Close" }).click();
        await expect.poll(() => isDialogOpen(page, "Keyboard shortcuts")).toBe(false);
    });
});
