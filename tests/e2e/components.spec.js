import { expect, test } from '@playwright/test';
import { DECK_SLIDES, collectErrors, slideFit } from './helpers.js';

/** Opens a slide of the English demo with all its steps, once its content has settled. */
async function openSlide(page, number) {
    await page.goto(`demo-en/#${number}.999`);
    const viewer = page.locator("[data-slide-viewer]");
    await expect(viewer).toBeVisible();
    await page.waitForLoadState("networkidle", { timeout: 5000 }).catch(() => null);
    await page.evaluate(() => document.fonts.ready);
    return viewer;
}

test.describe("slide components", () => {
    test("draws every slide of the demo fitted to the screen, without errors", async ({ page }) => {
        test.slow();
        const errors = collectErrors(page);
        const fits = [];
        for (let number = 1; number<=DECK_SLIDES; number++) {
            await openSlide(page, number);
            await expect(page.getByText("This slide could not be displayed")).toHaveCount(0);
            fits.push({ number, ...await slideFit(page) });
        }
        expect(fits.filter((fit) => fit.overflow || fit.scale<0.5)).toEqual([]);
        expect(errors).toEqual([]);
    });

    test("fits the slides the same way without motion", async ({ browser }) => {
        const page = await browser.newPage({ reducedMotion: "reduce" });
        for (const number of [12, 13, 16, 19]) {
            await openSlide(page, number);
            const fit = await slideFit(page);
            expect(fit.overflow, `slide ${number}`).toBe(false);
            expect(fit.scale, `slide ${number}`).toBeGreaterThanOrEqual(0.5);
        }
        await page.close();
    });

    test("formats texts, and opens outside links in a new tab", async ({ page }) => {
        let viewer = await openSlide(page, 4);
        await expect(viewer.getByText("Underlined")).toHaveCSS("text-decoration-line", "underline");
        await expect(viewer.getByText("Struck through")).toHaveCSS("text-decoration-line", "line-through");
        await expect(viewer.getByText("Italic", { exact: true })).toHaveCSS("font-style", "italic");
        await expect(viewer.getByText("Bold", { exact: true })).toHaveCSS("font-weight", "700");
        viewer = await openSlide(page, 5);
        const link = viewer.getByRole("link", { name: "link to google.com" });
        await expect(link).toHaveAttribute("href", "https://google.com");
        await expect(link).toHaveAttribute("target", "_blank");
        await expect(link).toHaveAttribute("rel", "noreferrer");
    });

    test("draws the corners of the deck and of a slide", async ({ page }) => {
        let viewer = await openSlide(page, 11);
        await expect(viewer.getByText("Chapter 3 · Layout")).toBeVisible();
        await expect(viewer.getByText("Slide 11 of 21")).toBeVisible();
        viewer = await openSlide(page, 1);
        await expect(viewer.getByText("Chapter 3 · Layout")).toHaveCount(0);
    });

    test("loads images, lists and tables", async ({ page }) => {
        let viewer = await openSlide(page, 12);
        const images = viewer.locator("img");
        await expect(images).toHaveCount(4);
        expect(await images.evaluateAll((all) => all.every((image) => image.complete && image.naturalWidth>0))).toBe(true);
        await expect(viewer.locator("figcaption")).toHaveCount(3);
        viewer = await openSlide(page, 13);
        await expect(viewer.locator("ul.list-decimal")).not.toHaveCount(0);
        await expect(viewer.locator("ul.list-disc")).not.toHaveCount(0);
        viewer = await openSlide(page, 14);
        for (const subject of ["Mathematics", "Sport"])
            await expect(viewer.getByRole("cell", { name: subject })).toBeVisible();
    });

    test("highlights code and renders Markdown", async ({ page }) => {
        let viewer = await openSlide(page, 15);
        await expect(viewer.locator("pre")).toHaveCount(2);
        expect(await viewer.locator("pre span[style*=color]").count()).toBeGreaterThan(20);
        viewer = await openSlide(page, 16);
        for (const level of [1, 2, 3, 4, 5, 6])
            await expect(viewer.getByRole("heading", { level, name: `Heading ${level}` })).toBeVisible();
        await expect(viewer.getByRole("checkbox")).toHaveCount(2);
        await expect(viewer.locator("blockquote")).toHaveText("Here is a quote");
        await expect(viewer.locator("pre span[style*=color]")).not.toHaveCount(0);
        await expect(viewer.getByRole("link", { name: "Link to google.com" })).toHaveAttribute("target", "_blank");
    });

    test("draws Mermaid diagrams and KaTeX formulas", async ({ page }) => {
        let viewer = await openSlide(page, 17);
        await expect(viewer.locator("svg[aria-roledescription]")).toHaveCount(2);
        await expect(viewer.getByText("Clear enough?")).toBeVisible();
        expect(await page.evaluate(() => document.documentElement.scrollHeight<=innerHeight)).toBe(true);
        viewer = await openSlide(page, 18);
        await expect.poll(() => viewer.locator(".katex").count()).toBeGreaterThanOrEqual(3);
        await expect.poll(() => viewer.locator(".katex-display").count()).toBeGreaterThanOrEqual(2);
    });

    test("plays the video of the slide shown, and loads the player of a video service", async ({ page }) => {
        const viewer = await openSlide(page, 19);
        const video = viewer.locator("video");
        await expect(video).toHaveCount(1);
        await expect.poll(() => video.evaluate((element) => !element.paused && element.muted && element.loop)).toBe(true);
        await expect(viewer.locator("iframe")).toHaveAttribute("src", /youtube(-nocookie)?\.com\/embed\//);
        await page.keyboard.press("m");
        const thumbnail = page.getByRole("dialog", { name: "Mosaic" }).getByRole("button", { name: "Slide 19" });
        await expect(thumbnail.locator("iframe")).toHaveCount(0);
        await expect(thumbnail.locator("video")).toHaveCount(0);
    });

    test("shows a Markdown image on the last slide", async ({ page }) => {
        const viewer = await openSlide(page, 21);
        const image = viewer.getByRole("img", { name: "React Slides logo" });
        await expect(image).toBeVisible();
        expect(await image.evaluate((element) => element.naturalWidth>0)).toBe(true);
    });
});
