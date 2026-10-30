import { expect, test } from '@playwright/test';
import { DECK_SLIDES } from './helpers.js';

/** Records the content security policy violations of every page opened from now on. */
function recordViolations(page) {
    return page.addInitScript(() => {
        window.violations = [];
        document.addEventListener("securitypolicyviolation", (event) => window.violations.push(`${event.violatedDirective} ${event.blockedURI}`));
    });
}

/** Reads the violations recorded on the page open. */
function violations(page) {
    return page.evaluate(() => window.violations);
}

test.describe("security", () => {
    test("serves the app under the policy of production", async ({ request }) => {
        const response = await request.get("demo-en/");
        const policy = response.headers()["content-security-policy"];
        expect(policy).toContain("default-src 'self'");
        expect(policy).toContain("script-src 'self';");
        expect(policy).toContain("frame-ancestors 'none'");
    });

    test("breaks no rule of the policy on any page of the app", async ({ page }) => {
        test.slow();
        await recordViolations(page);
        await page.goto("./");
        await page.waitForLoadState("networkidle");
        expect(await violations(page)).toEqual([]);
        for (let number = 1; number<=DECK_SLIDES; number++) {
            await page.goto(`demo-en/#${number}.999`);
            await page.waitForLoadState("networkidle", { timeout: 5000 }).catch(() => null);
            expect(await violations(page), `slide ${number}`).toEqual([]);
        }
        await page.keyboard.press("m");
        await page.waitForTimeout(1500);
        await page.goto("demo/?presenter=policy#19");
        await page.waitForLoadState("networkidle", { timeout: 5000 }).catch(() => null);
        expect(await violations(page)).toEqual([]);
    });

    test("breaks no rule of the policy of the user guide", async ({ page }) => {
        await recordViolations(page);
        for (const path of ["docs/en/", "docs/fr/interface/presenter/", "docs/en/building/diagrams-and-formulas/"]) {
            await page.goto(path);
            await page.waitForLoadState("networkidle", { timeout: 5000 }).catch(() => null);
            expect(await violations(page), path).toEqual([]);
        }
    });
});
