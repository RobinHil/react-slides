import { expect } from '@playwright/test';

const DECK_SLIDES = 21;

/** Opens a deck at a position, such as "#7" or "#7.2", once its slide is drawn. */
async function openDeck(page, deck="demo-en", position="#1") {
    await page.goto(`${deck}/${position}`);
    await expect(page.locator("[data-slide-viewer]")).toBeVisible();
    await page.waitForLoadState("networkidle").catch(() => null);
}

/** Reads the position written in the address. */
function position(page) {
    return page.evaluate(() => location.hash);
}

/** Waits until the address shows a position. */
async function expectPosition(page, hash) {
    await expect.poll(() => position(page)).toBe(hash);
}

/** Tells whether a dialog, such as the mosaic or the help, is open. */
function isDialogOpen(page, name) {
    return page.locator(`[role=dialog][aria-label="${name}"]`).evaluate((dialog) => !dialog.closest("[inert]"));
}

/** Reads the width of the progress bar, as a percentage. */
function progress(page) {
    return page.locator("[role=progressbar]").getAttribute("aria-valuenow").then(Number);
}

/** Measures the toolbar: how far its navigation is from its middle, whether a control overflows it, and how wide the slide number is. */
function measureToolbar(page) {
    return page.evaluate(() => {
        const input = document.querySelector("input[inputmode=numeric]");
        const nav = input.closest(".grid > *");
        const bar = nav.parentElement;
        const style = getComputedStyle(bar);
        const box = bar.getBoundingClientRect();
        const inner = box.left+parseFloat(style.borderLeftWidth)+parseFloat(style.paddingLeft);
        const width = bar.clientWidth-parseFloat(style.paddingLeft)-parseFloat(style.paddingRight);
        const middle = nav.getBoundingClientRect();
        const controls = [...bar.querySelectorAll("button, a, input")].filter((control) => control.getClientRects().length);
        return {
            offset: Math.round(middle.left+middle.width/2-(inner+width/2)),
            overflow: controls.some((control) => {
                const rect = control.getBoundingClientRect();
                return rect.left<box.left-1 || rect.right>box.right+1;
            }),
            input: Math.round(input.getBoundingClientRect().width),
            pageScroll: document.documentElement.scrollWidth>innerWidth
        };
    });
}

/** Reads the scale the content of the slide shown was fitted at, and whether it overflows. */
function slideFit(page) {
    return page.locator("[data-slide-viewer]").evaluate((viewer) => {
        const frame = viewer.querySelector(".origin-top-left .origin-top-left");
        const scale = Number(/scale\(([\d.]+)\)/.exec(frame.style.transform)?.[1] ?? 1);
        return { scale, overflow: frame.scrollWidth>frame.clientWidth+1 || frame.scrollHeight>frame.clientHeight+1 };
    });
}

/** Collects the errors a page reports, network failures to outside services left aside. */
function collectErrors(page) {
    const errors = [];
    page.on("pageerror", (error) => errors.push(error.message));
    page.on("console", (message) => {
        if (message.type()==="error" && !/youtube|ytimg|vimeo|api\.github\.com/i.test(message.text()))
            errors.push(message.text());
    });
    return errors;
}

export { DECK_SLIDES, openDeck, position, expectPosition, isDialogOpen, progress, measureToolbar, slideFit, collectErrors };
