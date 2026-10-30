import js from '@eslint/js';
import globals from 'globals';
import reactHooks from 'eslint-plugin-react-hooks';
import reactRefresh from 'eslint-plugin-react-refresh';

export default [
    { ignores: ["dist", "docs/site", "test-results", "playwright-report", "blob-report"] },
    js.configs.recommended,
    reactHooks.configs.flat["recommended-latest"],
    reactRefresh.configs.vite,
    {
        files: ["**/*.{js,jsx}"],
        languageOptions: {
            globals: globals.browser,
            parserOptions: { ecmaFeatures: { jsx: true } }
        }
    },
    {
        files: ["vite.config.js", "scripts/**/*.{js,mjs}"],
        languageOptions: { globals: globals.node }
    },
    {
        files: ["playwright.config.js", "vitest.config.js", "tests/**/*.{js,jsx,mjs}"],
        languageOptions: { globals: { ...globals.node, ...globals.browser } }
    },
    {
        files: ["src/contexts/*.jsx"],
        rules: { "react-refresh/only-export-components": "off" }
    }
];
