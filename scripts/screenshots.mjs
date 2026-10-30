import { mkdirSync, readFileSync, readdirSync, existsSync, rmSync } from 'node:fs';
import { resolve } from 'node:path';
import { chromium } from '@playwright/test';
import { preview } from 'vite';

const ROOT = resolve(import.meta.dirname, "..");
const DIST = resolve(ROOT, "dist");
const DESKTOP = { width: 1440, height: 900 };
const PHONE = { width: 390, height: 844 };
const PREVIEW = { width: 1200, height: 675 };
const SLIDES = { width: 1600, height: 900 };
const LANGUAGES = [
    { language: "en", locale: "en-US", deck: "demo-en" },
    { language: "fr", locale: "fr-FR", deck: "demo" }
];

/** Reads the base the site was built with from the script of its home page, such as "/react-slides/" or "./". */
function readBase() {
    const html = readFileSync(resolve(DIST, "index.html"), "utf8");
    const prefix = /<script[^>]*\ssrc="([^"]*)assets\//.exec(html)?.[1];
    if (prefix===undefined)
        throw new Error("dist/index.html has no script, run pnpm build first");
    return prefix.startsWith(".") ? "/" : prefix;
}

/** Lists the decks of the build. */
function readDecks() {
    return readdirSync(DIST, { withFileTypes: true })
        .filter((entry) => entry.isDirectory() && existsSync(resolve(DIST, entry.name, "index.html")))
        .map((entry) => entry.name)
        .filter((name) => readFileSync(resolve(DIST, name, "index.html"), "utf8").includes('<meta name="deck"'));
}

/** Opens a page in a browser set to a language, light, without motion, failing on any error it reports. */
async function openPage(browser, { locale="en-US", viewport=DESKTOP, isMobile=false }={}) {
    const context = await browser.newContext({ locale, viewport, isMobile, hasTouch: isMobile, colorScheme: "light", reducedMotion: "reduce" });
    const page = await context.newPage();
    page.on("pageerror", (error) => {
        throw error;
    });
    return page;
}

/** Waits until a page has loaded its files, or a few seconds when a player keeps streaming, then its fonts and the content its slide draws. */
async function settle(page, delay=600) {
    await page.waitForLoadState("networkidle", { timeout: 5000 }).catch(() => null);
    await page.evaluate("document.fonts.ready");
    await page.waitForTimeout(delay);
}

/** Takes the preview of each deck, its first slide with every step in full screen, into the folder of the deck. */
async function takePreviews(browser, url) {
    for (const name of readDecks()) {
        const page = await openPage(browser, { viewport: PREVIEW });
        await page.goto(`${url}${name}/#1.999`);
        await settle(page);
        await page.keyboard.press("b");
        await page.keyboard.press("f");
        await settle(page, 800);
        await page.locator("[data-slide-viewer]").screenshot({ path: resolve(ROOT, "src/decks", name, "preview.png") });
        await page.context().close();
        console.log(`preview: ${name}`);
    }
}

/** Takes the pictures of the interface for the user guide of one language. */
async function takeInterface(browser, url, { language, locale, deck }) {
    const folder = resolve(ROOT, "docs", language, "images/interface");
    mkdirSync(folder, { recursive: true });
    const shot = (name) => resolve(folder, `${name}.png`);

    const page = await openPage(browser, { locale });
    await page.goto(url);
    await settle(page, 1200);
    await page.screenshot({ path: shot("home") });

    await page.goto(`${url}${deck}/#9`);
    await settle(page);
    await page.screenshot({ path: shot("deck") });
    await page.locator(".flow-root").first().screenshot({ path: shot("toolbar") });

    await page.keyboard.press("s");
    await settle(page, 1200);
    await page.screenshot({ path: shot("slide-list") });
    await page.keyboard.press("s");

    await page.keyboard.press("m");
    await settle(page, 1500);
    await page.screenshot({ path: shot("mosaic") });
    await page.keyboard.press("Escape");

    await page.goto(`${url}${deck}/#2`);
    await settle(page);
    await page.keyboard.press("n");
    await settle(page, 1200);
    await page.screenshot({ path: shot("notes") });
    await page.keyboard.press("n");

    await page.keyboard.press("?");
    await settle(page);
    await page.screenshot({ path: shot("help") });
    await page.keyboard.press("Escape");

    await page.goto(`${url}${deck}/#7`);
    await settle(page);
    await page.keyboard.press("f");
    await page.mouse.move(DESKTOP.width/2, DESKTOP.height/2);
    await page.mouse.move(40, 40, { steps: 5 });
    await settle(page, 1200);
    await page.screenshot({ path: shot("full-screen") });
    await page.context().close();

    const presenter = await openPage(browser, { locale });
    await presenter.goto(`${url}${deck}/?presenter=screenshots#13`);
    await settle(presenter, 1500);
    await presenter.screenshot({ path: shot("presenter") });
    await presenter.context().close();

    const phone = await openPage(browser, { locale, viewport: PHONE, isMobile: true });
    await phone.goto(`${url}${deck}/#5`);
    await settle(phone);
    await phone.screenshot({ path: shot("phone") });
    await phone.context().close();
    console.log(`interface: ${language}`);
}

/** Takes a picture of every slide of the demo deck of one language, all its steps shown. */
async function takeSlides(browser, url, { language, locale, deck }) {
    const folder = resolve(ROOT, "docs", language, "images/slides");
    rmSync(folder, { recursive: true, force: true });
    mkdirSync(folder, { recursive: true });
    const page = await openPage(browser, { locale, viewport: SLIDES });
    await page.goto(`${url}${deck}/#1`);
    await settle(page);
    const total = Number(await page.locator("input[inputmode=numeric]").evaluate((input) => input.closest("div").textContent.match(/\d+/)?.[0] ?? 0));
    for (let number = 1; number<=total; number++) {
        await page.goto(`${url}${deck}/#${number}.999`);
        await settle(page, 1500);
        await page.locator("[data-slide-viewer]").screenshot({ path: resolve(folder, `${String(number).padStart(2, "0")}.png`) });
    }
    await page.context().close();
    console.log(`slides: ${language}, ${total}`);
}

const base = readBase();
const server = await preview({ configFile: false, base, preview: { port: 4173, open: false } });
const browser = await chromium.launch();
try {
    const url = server.resolvedUrls.local[0];
    await takePreviews(browser, url);
    for (const language of LANGUAGES) {
        await takeInterface(browser, url, language);
        await takeSlides(browser, url, language);
    }
} finally {
    await browser.close();
    await server.close();
}
