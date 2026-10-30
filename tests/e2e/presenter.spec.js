import { expect, test } from '@playwright/test';
import { expectPosition, openDeck, position } from './helpers.js';

/** Opens the presenter view of a deck from its button, the deck staying as the audience window. */
async function present(page) {
    const [presenter] = await Promise.all([page.waitForEvent("popup"), page.keyboard.press("v")]);
    await presenter.waitForLoadState();
    await expect(presenter.locator("header")).toBeVisible({ timeout: 30000 });
    return presenter;
}

test.describe("presenter view", () => {
    test("opens in a window of its own, in a session of its own", async ({ page }) => {
        await openDeck(page, "demo-en", "#3");
        const presenter = await present(page);
        const session = new URL(presenter.url()).searchParams.get("presenter");
        expect(session).toMatch(/^[\w-]{8,}$/);
        await expect(presenter).toHaveTitle("Presenter view · React Slides");
        await expectPosition(presenter, "#3");
        await expect(presenter.getByRole("heading", { name: "Next slide" })).toBeVisible();
        await expect(presenter.getByRole("heading", { name: "Notes" })).toBeVisible();
        await expect(presenter.getByRole("button", { name: "Start the timer" })).toBeVisible();
        await page.bringToFront();
        await page.keyboard.press("v");
        await expect.poll(() => new URL(presenter.url()).searchParams.get("presenter")).not.toBe(session);
        expect(page.context().pages()).toHaveLength(2);
    });

    test("keeps the audience and the presenter on the same slide and step, either way", async ({ page }) => {
        await openDeck(page, "demo-en", "#3");
        const presenter = await present(page);
        await presenter.keyboard.press("ArrowRight");
        await expectPosition(page, "#4");
        await page.keyboard.press("ArrowRight");
        await expectPosition(presenter, "#5");
        await presenter.locator("main > div").first().click();
        await expectPosition(page, "#6");
        await presenter.getByRole("textbox", { name: "Slide number" }).fill("20");
        await presenter.keyboard.press("Enter");
        await expectPosition(page, "#20");
        await expect(presenter.getByRole("heading", { name: "Next step" })).toBeVisible();
        await presenter.keyboard.press("ArrowRight");
        await expectPosition(page, "#20.1");
        await page.keyboard.press("ArrowUp");
        await expectPosition(presenter, "#21");
        await expect(presenter.getByText("End of the presentation")).toBeVisible();
    });

    test("catches up with the audience when opened again in the same session", async ({ page }) => {
        await openDeck(page, "demo-en", "#3");
        const presenter = await present(page);
        await page.keyboard.press("ArrowRight");
        await expectPosition(presenter, "#4");
        const url = new URL(presenter.url());
        url.hash = "";
        const late = await page.context().newPage();
        await late.goto(url.href);
        await expectPosition(late, "#4");
    });

    test("shows the notes of the slide, larger or smaller, remembering the size", async ({ page }) => {
        await openDeck(page, "demo-en", "#2");
        const presenter = await present(page);
        const notes = presenter.locator("main aside section").last();
        await expect(notes.getByRole("heading", { name: "The plan" })).toBeVisible();
        const zoom = () => notes.locator("[style*=zoom]").evaluate((element) => element.style.zoom);
        expect(await zoom()).toBe("1");
        await presenter.getByRole("button", { name: "Larger notes" }).click();
        await presenter.getByRole("button", { name: "Larger notes" }).click();
        expect(await zoom()).toBe("1.5");
        await presenter.reload();
        await expect(notes.getByRole("heading", { name: "The plan" })).toBeVisible();
        expect(await zoom()).toBe("1.5");
        for (let click = 0; click<9; click++)
            await presenter.getByRole("button", { name: "Smaller notes" }).click();
        expect(await zoom()).toBe("0.8");
        await presenter.keyboard.press("ArrowRight");
        await expect(notes).toContainText("No notes for this slide.");
    });

    test("closes with the audience leaving full screen", async ({ page }) => {
        await openDeck(page, "demo-en", "#3");
        const presenter = await present(page);
        await page.bringToFront();
        await page.keyboard.press("f");
        await expect.poll(() => page.evaluate(() => Boolean(document.fullscreenElement))).toBe(true);
        await page.keyboard.press("f");
        await expect.poll(() => presenter.isClosed()).toBe(true);
        await page.keyboard.press("ArrowRight");
        await expectPosition(page, "#4");
        expect(await position(page)).toBe("#4");
    });
});

/** Lets the seconds go by one at a time, as the timer schedules its ticks one after the other. */
async function advance(page, seconds) {
    for (let second = 0; second<seconds; second++)
        await page.clock.runFor(1000);
}

test.describe("presenter timer and clock", () => {
    test.use({ timezoneId: "Europe/Paris" });

    test("waits to be started, then pauses, resumes and resets, second by second", async ({ page }) => {
        await page.clock.install({ time: new Date("2026-10-30T09:40:30+01:00") });
        await page.goto("demo-en/?presenter=timer#3");
        await expect(page.locator("header")).toBeVisible();
        await page.clock.pauseAt(new Date("2026-10-30T09:40:59+01:00"));
        const timer = page.locator("header > div").first();
        await expect(timer).toContainText("00:00");
        await expect(page.locator("header")).toContainText("09:40 AM");
        await advance(page, 5);
        await expect(timer).toContainText("00:00");
        await page.getByRole("button", { name: "Start the timer" }).click();
        await advance(page, 61);
        await expect(timer).toContainText("01:01");
        await expect(page.locator("header")).toContainText("09:42 AM");
        await page.getByRole("button", { name: "Pause the timer" }).click();
        await advance(page, 5);
        await expect(timer).toContainText("01:01");
        await page.getByRole("button", { name: "Resume the timer" }).click();
        await advance(page, 2);
        await expect(timer).toContainText("01:03");
        await page.getByRole("button", { name: "Reset the timer" }).click();
        await expect(timer).toContainText("00:00");
        await advance(page, 1);
        await expect(timer).toContainText("00:01");
        await page.getByRole("button", { name: "Pause the timer" }).click();
        await page.getByRole("button", { name: "Reset the timer" }).click();
        await expect(timer).toContainText("00:00");
        await expect(page.getByRole("button", { name: "Start the timer" })).toBeVisible();
    });
});
