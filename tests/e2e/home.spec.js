import { expect, test } from '@playwright/test';
import { collectErrors } from './helpers.js';

test.describe("home page", () => {
    test("lists every deck with its title, description, slides and language", async ({ page }) => {
        const errors = collectErrors(page);
        await page.goto("./");
        await expect(page).toHaveTitle("React Slides");
        await expect(page.getByText("3 presentations")).toBeVisible();
        const cards = page.locator("main a[href$='/']").filter({ hasNot: page.getByText("Documentation") });
        await expect(cards).toHaveCount(3);
        await expect(cards.nth(0)).toHaveAttribute("href", "demo/");
        await expect(cards.nth(0)).toContainText("La démo de la bibliothèque");
        await expect(cards.nth(0)).toContainText("21 slides");
        await expect(cards.nth(0)).toContainText("French");
        await expect(cards.nth(1)).toHaveAttribute("href", "demo-en/");
        await expect(cards.nth(1)).toContainText("The demo of the library");
        await expect(cards.nth(1)).toContainText("English");
        await expect(cards.nth(2)).toHaveAttribute("href", "starter/");
        await expect(cards.nth(2)).toContainText("3 slides");
        expect(errors).toEqual([]);
    });

    test("opens a deck from its card", async ({ page }) => {
        await page.goto("./");
        await page.locator("main a[href='starter/']").click();
        await expect(page).toHaveURL(/\/react-slides\/starter\/#1$/);
        await expect(page).toHaveTitle("Modèle de départ");
    });

    test("speaks the language of the browser, English by default", async ({ browser }) => {
        for (const [locale, count, language] of [["fr-FR", "3 présentations", "fr"], ["de-DE", "3 presentations", "en"], ["en-GB", "3 presentations", "en"]]) {
            const page = await browser.newPage({ locale });
            await page.goto("./");
            await expect(page.getByText(count)).toBeVisible();
            await expect(page.locator("html")).toHaveAttribute("lang", language);
            await page.close();
        }
    });

    test("follows the theme of the system", async ({ browser }) => {
        const background = async (colorScheme) => {
            const page = await browser.newPage({ colorScheme });
            await page.goto("./");
            const color = await page.locator("main").evaluate((main) => getComputedStyle(main).backgroundColor);
            await page.close();
            return color;
        };
        expect(await background("dark")).not.toBe(await background("light"));
    });

    test("leads to the user guide in the language of the interface", async ({ browser }) => {
        for (const [locale, language] of [["en-US", "en"], ["fr-FR", "fr"]]) {
            const page = await browser.newPage({ locale });
            await page.goto("./");
            await page.getByRole("link", { name: "Documentation" }).click();
            await expect(page).toHaveURL(new RegExp(`/docs/${language}/$`));
            await expect(page.locator("html")).toHaveAttribute("lang", language);
            await page.close();
        }
    });

    test("loads a deck only once its card comes near the screen", async ({ browser, browserName }) => {
        test.skip(browserName!=="chromium", "Network timing is checked once");
        const page = await browser.newPage({ viewport: { width: 390, height: 260 } });
        const decks = new Set();
        page.on("request", (request) => {
            const chunk = /assets\/(Deck-[\w-]+\.js)/.exec(request.url())?.[1];
            if (chunk)
                decks.add(chunk);
        });
        await page.goto("./");
        await expect.poll(() => decks.size).toBe(1);
        await page.waitForTimeout(1000);
        expect(decks.size).toBe(1);
        await page.locator("main a[href='starter/']").scrollIntoViewIfNeeded();
        await expect.poll(() => decks.size).toBe(3);
        await page.close();
    });
});
