import { expect, test } from '@playwright/test';
import { collectErrors, expectPosition, isDialogOpen, measureToolbar, openDeck } from './helpers.js';

/** Swipes a finger across the slide, by a horizontal distance in pixels. */
async function swipe(page, distance) {
    const box = await page.locator("[data-slide-viewer]").boundingBox();
    const y = box.y+box.height/2;
    const from = box.x+box.width/2-distance/2;
    const cdp = await page.context().newCDPSession(page);
    const point = (x) => [{ x, y, id: 1 }];
    await cdp.send("Input.dispatchTouchEvent", { type: "touchStart", touchPoints: point(from) });
    for (let step = 1; step<=5; step++)
        await cdp.send("Input.dispatchTouchEvent", { type: "touchMove", touchPoints: point(from+distance*step/5) });
    await cdp.send("Input.dispatchTouchEvent", { type: "touchEnd", touchPoints: [] });
    await cdp.detach();
}

/** Lists the labels of the toolbar controls shown. */
function shownControls(page) {
    return page.locator(".flow-root [aria-label]").evaluateAll((controls) => controls.filter((control) => control.checkVisibility()).map((control) => control.ariaLabel));
}

test.describe("phone", () => {
    test("lists the decks one below the other, the guide behind an icon", async ({ page }) => {
        const errors = collectErrors(page);
        await page.goto("./");
        const cards = page.locator("main a[href$='/']:not([href*=docs])");
        await expect(cards).toHaveCount(3);
        const boxes = await cards.evaluateAll((all) => all.map((card) => card.getBoundingClientRect().left));
        expect(new Set(boxes.map(Math.round)).size).toBe(1);
        const guide = page.getByRole("link", { name: "Documentation" });
        await expect(guide).toBeVisible();
        await expect(guide.getByText("Documentation")).toBeHidden();
        expect(await page.evaluate(() => document.documentElement.scrollWidth<=innerWidth)).toBe(true);
        expect(errors).toEqual([]);
    });

    test("puts the toolbar at the bottom with what a phone needs, centred", async ({ page }) => {
        await openDeck(page, "demo-en", "#3");
        const toolbar = await page.locator(".flow-root").first().boundingBox();
        const viewport = page.viewportSize();
        expect(toolbar.y+toolbar.height).toBeGreaterThan(viewport.height-30);
        expect(await shownControls(page)).toEqual(["All presentations", "Show mosaic", "Previous slide", "Slide number", "Next slide", "Export PDF", "Full screen"]);
        const measure = await measureToolbar(page);
        expect(Math.abs(measure.offset)).toBeLessThanOrEqual(1);
        expect(measure.overflow).toBe(false);
        expect(measure.pageScroll).toBe(false);
        for (const button of await page.locator(".flow-root button:visible, .flow-root a:visible").all()) {
            const box = await button.boundingBox();
            expect(box.height).toBeGreaterThanOrEqual(40);
        }
    });

    test("changes slides with a tap on the buttons or a swipe", async ({ page }) => {
        await openDeck(page, "demo-en", "#3");
        await page.getByRole("button", { name: "Next slide" }).tap();
        await expectPosition(page, "#4");
        await swipe(page, -200);
        await expectPosition(page, "#5");
        await swipe(page, 200);
        await expectPosition(page, "#4");
        await swipe(page, -10);
        await page.waitForTimeout(300);
        await expectPosition(page, "#4");
        for (const distance of [-200, -200, -200, 200])
            await swipe(page, distance);
        await expectPosition(page, "#6");
    });

    test("answers no shortcut of a hidden button", async ({ page }) => {
        await openDeck(page, "demo-en", "#3");
        for (const key of ["s", "n", "b", "v", "?"]) {
            await page.keyboard.press(key);
            await page.waitForTimeout(100);
        }
        expect(await isDialogOpen(page, "Keyboard shortcuts")).toBe(false);
        expect(page.context().pages()).toHaveLength(1);
        await expect(page.getByRole("progressbar")).toBeVisible();
    });

    test("opens the mosaic and closes it on the slide picked", async ({ page }) => {
        await openDeck(page, "demo-en", "#3");
        await page.getByRole("button", { name: "Show mosaic" }).tap();
        await expect.poll(() => isDialogOpen(page, "Mosaic")).toBe(true);
        const mosaic = page.getByRole("dialog", { name: "Mosaic" });
        await mosaic.getByRole("button", { name: "Slide 8" }).tap();
        await expectPosition(page, "#8");
        await expect.poll(() => isDialogOpen(page, "Mosaic")).toBe(false);
    });

    test("shows the toolbar in full screen with a tap on the slide", async ({ page }) => {
        await openDeck(page, "demo-en", "#3");
        await page.getByRole("button", { name: "Full screen" }).tap();
        const toolbar = page.locator(".flow-root").first();
        const isShown = () => toolbar.evaluate((element) => getComputedStyle(element).opacity==="1");
        await expect.poll(isShown).toBe(false);
        await page.locator("[data-slide-viewer]").tap();
        await expect.poll(isShown).toBe(true);
        await page.getByRole("button", { name: "Next slide" }).tap();
        await expectPosition(page, "#4");
        await page.locator("[data-slide-viewer]").tap();
        await expect.poll(isShown).toBe(false);
    });

    test("exports the deck to PDF", async ({ page }) => {
        await page.addInitScript(() => {
            window.printCount = 0;
            window.print = () => {
                window.printCount++;
            };
        });
        await openDeck(page, "demo-en", "#3");
        await page.getByRole("button", { name: "Export PDF" }).tap();
        await expect.poll(() => page.evaluate(() => window.printCount), { timeout: 30000 }).toBe(1);
        await expect(page.locator(".break-after-page")).toHaveCount(21);
    });

    test("keeps the slide and the toolbar usable in landscape", async ({ page }) => {
        const portrait = page.viewportSize();
        await page.setViewportSize({ width: portrait.height, height: portrait.width });
        await openDeck(page, "demo-en", "#3");
        const measure = await measureToolbar(page);
        expect(Math.abs(measure.offset)).toBeLessThanOrEqual(1);
        expect(measure.overflow).toBe(false);
        expect(measure.pageScroll).toBe(false);
        const slide = await page.locator("[data-slide-viewer]").boundingBox();
        expect(slide.height).toBeGreaterThan(portrait.width*0.7);
        await expect(page.locator("[data-slide-viewer]")).toHaveScreenshot("landscape.png");
    });

    test("draws the deck and the guide for a phone", async ({ page }) => {
        await openDeck(page, "demo-en", "#13");
        await page.waitForTimeout(800);
        await expect(page).toHaveScreenshot("deck.png");
        await page.goto("docs/en/interface/navigation/");
        await expect(page.locator("html")).toHaveAttribute("lang", "en");
        expect(await page.evaluate(() => document.documentElement.scrollWidth<=innerWidth)).toBe(true);
    });
});
