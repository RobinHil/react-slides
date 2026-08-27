import js from '@eslint/js';
import globals from 'globals';
import react from 'eslint-plugin-react';
import reactHooks from 'eslint-plugin-react-hooks';
import reactRefresh from 'eslint-plugin-react-refresh';

export default [
    { ignores: ['dist'] },
    js.configs.recommended,
    react.configs.flat.recommended,
    react.configs.flat['jsx-runtime'],
    reactHooks.configs.flat['recommended-latest'],
    {
        files: ['**/*.{js,jsx}'],
        languageOptions: {
            ecmaVersion: 'latest',
            sourceType: 'module',
            globals: globals.browser,
            parserOptions: { ecmaFeatures: { jsx: true } },
        },
        settings: { react: { version: 'detect' } },
        plugins: { 'react-refresh': reactRefresh },
        rules: {
            'react-refresh/only-export-components': ['warn', { allowConstantExport: true }],
            // Le projet est en JavaScript sans PropTypes : les composants documentent
            // leurs props par leur signature de destructuration.
            'react/prop-types': 'off',
            // Les apostrophes typographiques sont ecrites telles quelles dans les slides.
            'react/no-unescaped-entities': 'off',
        },
    },
    {
        // Les fichiers de contexte exportent volontairement un provider et son hook
        // d'acces cote a cote ; seul le rafraichissement a chaud y perd un peu.
        files: ['src/contexts/*.jsx'],
        rules: { 'react-refresh/only-export-components': 'off' },
    },
];
