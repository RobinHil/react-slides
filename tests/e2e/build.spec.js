import { execFileSync } from 'node:child_process';
import { createServer } from 'node:http';
import { readFile, stat } from 'node:fs/promises';
import { join, resolve } from 'node:path';
import { expect, test } from '@playwright/test';
import { collectErrors } from './helpers.js';

const SITE = "http://localhost:4173/react-slides/";
const DECKS = { demo: "React Slides", "demo-en": "React Slides", starter: "Modèle de départ" };

test.describe("build", () => {
    test.beforeEach(({ browserName }) => {
        test.skip(browserName!=="chromium", "The files of the build are checked once");
    });

    test("writes a page per deck, with its title, sharing tags and deck chunk", async ({ request }) => {
        for (const [deck, title] of Object.entries(DECKS)) {
            const html = await (await request.get(`${deck}/`)).text();
            expect(html).toContain(`<meta name="deck" content="${deck}"`);
            expect(html).toContain(`<title>${title}</title>`);
            expect(html).toContain(`<meta property="og:image" content="${SITE}${deck}/preview.png" />`);
            expect(html).toMatch(/<meta name="description" content="[^"]+"/);
            const preload = /<link rel="modulepreload"[^>]*href="([^"]*Deck-[^"]+\.js)"/.exec(html)?.[1];
            expect(preload, deck).toBeTruthy();
            for (const asset of html.matchAll(/(?:src|href)="(\/react-slides\/[^"]+)"/g)) {
                const response = await request.get(`http://localhost:4173${asset[1]}`);
                expect(response.status(), asset[1]).toBe(200);
            }
            const preview = await request.get(`${deck}/preview.png`);
            expect(preview.headers()["content-type"]).toBe("image/png");
        }
    });

    test("builds the user guide for the address of the site, in both languages", async ({ request }) => {
        const redirect = await (await request.get("docs/")).text();
        expect(redirect).toContain("location.replace(`${language}/`)");
        for (const language of ["en", "fr"]) {
            const html = await (await request.get(`docs/${language}/`)).text();
            expect(html).toContain(`<html lang="${language}"`);
            expect(html).toContain(`<link rel="canonical" href="${SITE}docs/${language}/"`);
            const sitemap = await (await request.get(`docs/${language}/sitemap.xml`)).text();
            expect(sitemap).toContain(`${SITE}docs/${language}/building/deployment/`);
        }
    });

    test("works from any folder when built with relative addresses", async ({ browser }, testInfo) => {
        test.setTimeout(240000);
        const folder = testInfo.outputPath("relative");
        execFileSync("pnpm", ["exec", "vite", "build", "--base=./", "--outDir", folder, "--logLevel", "error"], { cwd: resolve(import.meta.dirname, "../.."), stdio: "inherit", env: { ...process.env, SITE_URL: "" } });
        const prefix = "/any/folder/";
        const server = createServer(async (request, response) => {
            const route = decodeURIComponent(request.url.split("?")[0]);
            let path = join(folder, route.slice(prefix.length));
            try {
                if ((await stat(path)).isDirectory())
                    path = join(path, "index.html");
                const type = { ".html": "text/html", ".js": "text/javascript", ".css": "text/css", ".svg": "image/svg+xml" }[/\.\w+$/.exec(path)?.[0]];
                response.writeHead(200, type ? { "Content-Type": type } : {});
                response.end(await readFile(path));
            } catch {
                response.writeHead(404);
                response.end();
            }
        });
        await new Promise((done) => server.listen(0, done));
        const page = await browser.newPage();
        const errors = collectErrors(page);
        try {
            const origin = `http://localhost:${server.address().port}${prefix}`;
            await page.goto(origin);
            await expect(page.locator("main a[href='starter/']")).toBeVisible();
            await page.locator("main a[href='demo-en/']").click();
            await expect(page.locator("[data-slide-viewer]")).toContainText("A library of React components");
            await page.goto(`${origin}demo-en/#12`);
            const images = page.locator("[data-slide-viewer] img");
            await expect(images.first()).toBeVisible();
            expect(await images.evaluateAll((all) => all.every((image) => image.complete && image.naturalWidth>0))).toBe(true);
            await page.getByRole("link", { name: "All presentations" }).click();
            await expect(page).toHaveURL(origin);
            expect(errors).toEqual([]);
        } finally {
            await page.close();
            server.close();
        }
    });
});
