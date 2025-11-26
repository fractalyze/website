import js from '@eslint/js';
import typescript from '@typescript-eslint/eslint-plugin';
import tsParser from '@typescript-eslint/parser';
import nextPlugin from '@next/eslint-plugin-next';

export default [
  js.configs.recommended,
  {
    files: ['**/*.{js,jsx,ts,tsx}'],
    languageOptions: {
      parser: tsParser,
      parserOptions: {
        ecmaVersion: 2022,
        sourceType: 'module',
        ecmaFeatures: {
          jsx: true,
        },
      },
      globals: {
        React: 'readonly',
        JSX: 'readonly',
        console: 'readonly',
        process: 'readonly',
        module: 'readonly',
        require: 'readonly',
        __dirname: 'readonly',
        __filename: 'readonly',
        document: 'readonly',
        window: 'readonly',
        navigator: 'readonly',
        HTMLElement: 'readonly',
        Element: 'readonly',
        Node: 'readonly',
      },
    },
    plugins: {
      '@typescript-eslint': typescript,
      '@next/next': nextPlugin,
    },
    rules: {
      // Google style guide rules
      'indent': ['error', 2, {
        'SwitchCase': 1,
      }],
      'quotes': ['error', 'single', {
        'avoidEscape': true,
        'allowTemplateLiterals': true,
      }],
      'semi': ['error', 'always'],
      'comma-dangle': ['error', {
        'arrays': 'always-multiline',
        'objects': 'always-multiline',
        'imports': 'always-multiline',
        'exports': 'always-multiline',
        'functions': 'never',
      }],
      'object-curly-spacing': ['error', 'never'],
      'array-bracket-spacing': ['error', 'never'],
      'max-len': ['error', {
        'code': 100,
        'ignoreUrls': true,
        'ignoreStrings': true,
        'ignoreTemplateLiterals': true,
        'ignoreRegExpLiterals': true,
        'ignoreComments': true,
      }],
      'camelcase': ['error', {
        'properties': 'never',
        'ignoreDestructuring': true,
        'ignoreImports': true,
      }],
      'no-multiple-empty-lines': ['error', {
        'max': 1,
      }],
      'eol-last': ['error', 'always'],
      'no-trailing-spaces': 'error',
      'space-before-blocks': 'error',
      'keyword-spacing': 'error',
      'space-infix-ops': 'error',
      'space-before-function-paren': ['error', {
        'anonymous': 'never',
        'named': 'never',
        'asyncArrow': 'always',
      }],
      'arrow-spacing': 'error',
      'prefer-const': 'error',
      'no-var': 'error',
      'eqeqeq': ['error', 'always'],

      // TypeScript-specific rules
      'no-unused-vars': 'off',
      '@typescript-eslint/no-unused-vars': ['error', {
        'argsIgnorePattern': '^_',
        'varsIgnorePattern': '^_',
      }],
      '@typescript-eslint/no-explicit-any': 'warn',

      // React/Next.js specific
      'react/react-in-jsx-scope': 'off',
      'react/prop-types': 'off',

      // Disable JSDoc requirements (Google style requires them but they're not common in modern TS)
      'require-jsdoc': 'off',
      'valid-jsdoc': 'off',
    },
  },
  {
    ignores: [
      '.next/**',
      '.contentlayer/**',
      'node_modules/**',
      'out/**',
      'build/**',
      '.claude/**',
      'public/**',
    ],
  },
];
