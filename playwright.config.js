import { defineConfig, devices } from '@playwright/test';

const DESKTOP = { width: 1440, height: 900 };

export default defineConfig({
    testDir: "tests/e2e",
    fullyParallel: true,
    forbidOnly: Boolean(process.env.CI),
    retries: process.env.CI ? 1 : 0,
    timeout: 60000,
    reporter: [["list"], ["html", { open: "never" }]],
    snapshotPathTemplate: "tests/e2e/__screenshots__/{projectName}/{testFileName}/{arg}{ext}",
    expect: {
        timeout: 15000,
        toHaveScreenshot: { timeout: 30000, maxDiffPixelRatio: 0.01, animations: "disabled", caret: "hide", stylePath: "tests/e2e/screenshot.css" }
    },
    use: {
        baseURL: "http://localhost:4173/react-slides/",
        locale: "en-US",
        colorScheme: "light",
        trace: "retain-on-failure"
    },
    projects: [
        { name: "chromium", testIgnore: /mobile\.spec/, use: { ...devices["Desktop Chrome"], viewport: DESKTOP } },
        { name: "firefox", testIgnore: /mobile\.spec/, use: { ...devices["Desktop Firefox"], viewport: DESKTOP } },
        { name: "mobile", testMatch: /mobile\.spec/, use: { ...devices["Pixel 7"] } }
    ],
    webServer: {
        command: "node tests/server.mjs",
        url: "http://localhost:4173/react-slides/",
        reuseExistingServer: !process.env.CI
    }
});
