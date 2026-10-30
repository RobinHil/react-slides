import { expect, test } from '@playwright/test';
import { openDeck } from './helpers.js';

test.describe("languages", () => {
    test.describe("in a French browser", () => {
        test.use({ locale: "fr-FR" });

        test("speaks French in the interface while the slides and notes keep the language of their deck", async ({ page }) => {
            await openDeck(page, "demo-en", "#2");
            await expect(page.locator("html")).toHaveAttribute("lang", "fr");
            await expect(page.getByRole("button", { name: "Diapositive suivante" })).toBeVisible();
            await expect(page.getByRole("link", { name: "Toutes les présentations" })).toBeVisible();
            await expect(page.locator("[data-slide-viewer] [lang=en]").first()).toBeAttached();
            await expect(page.locator("[data-slide-viewer]")).toContainText("Outline");
            await page.keyboard.press("n");
            const notes = page.getByLabel("Notes", { exact: true });
            await expect(notes).toContainText("Diapositive 2 / 21");
            await expect(notes.locator("[lang=en]")).toContainText("The plan");
            await page.keyboard.press("?");
            const help = page.getByRole("dialog", { name: "Raccourcis clavier" });
            await expect(help).toContainText("Mosaïque des diapositives");
            await expect(help).toContainText("Échap");
        });

        test("shows the French demo in French", async ({ page }) => {
            await openDeck(page, "demo", "#2");
            await expect(page.locator("[data-slide-viewer] [lang=fr]").first()).toBeAttached();
            await expect(page.locator("[data-slide-viewer]")).toContainText("Sommaire");
        });

        test("speaks French in the presenter view", async ({ page }) => {
            await page.goto("demo-en/?presenter=language#3");
            await expect(page.getByRole("button", { name: "Lancer le chrono" })).toBeVisible();
            await expect(page.getByRole("heading", { name: "Diapositive suivante" })).toBeVisible();
            await expect(page).toHaveTitle("Mode présentateur · React Slides");
            await expect(page.locator("header > span")).toHaveText(/^\d\d:\d\d$/);
        });

        test("opens the user guide in French", async ({ page }) => {
            await page.goto("docs/");
            await expect(page).toHaveURL(/\/docs\/fr\/$/);
            await expect(page.locator("html")).toHaveAttribute("lang", "fr");
        });
    });

    test("opens the user guide in English for other languages", async ({ browser }) => {
        const page = await browser.newPage({ locale: "de-DE" });
        await page.goto("docs/");
        await expect(page).toHaveURL(/\/docs\/en\/$/);
        await page.close();
    });

    test("switches the user guide to the same page in the other language", async ({ page }) => {
        await page.goto("docs/en/building/steps-and-transitions/");
        await expect(page.locator("html")).toHaveAttribute("lang", "en");
        await page.locator(".md-select").first().hover();
        await page.getByRole("link", { name: "Français" }).click();
        await expect(page).toHaveURL(/\/docs\/fr\/building\/steps-and-transitions\/$/);
        await expect(page.locator("html")).toHaveAttribute("lang", "fr");
    });

    test("follows a change of the browser language", async ({ page }) => {
        await openDeck(page, "demo-en", "#2");
        await expect(page.getByRole("button", { name: "Next slide" })).toBeVisible();
        await page.evaluate(() => {
            Object.defineProperty(navigator, "languages", { get: () => ["fr-FR", "fr"] });
            window.dispatchEvent(new Event("languagechange"));
        });
        await expect(page.getByRole("button", { name: "Diapositive suivante" })).toBeVisible();
        await expect(page.locator("html")).toHaveAttribute("lang", "fr");
    });
});
