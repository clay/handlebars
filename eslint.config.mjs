import js from '@eslint/js';

// helpers, lib and client.js run in Node and in the browser (Kiln); the tests and scripts only in Node
const shared = {
  crypto: 'readonly',
  console: 'readonly',
  module: 'writable',
  require: 'readonly'
};

export default [
  { ignores: ['dist/**', 'coverage/**', 'node_modules/**'] },
  js.configs.recommended,
  {
    files: ['**/*.js'],
    languageOptions: {
      ecmaVersion: 2025,
      sourceType: 'commonjs',
      globals: { ...shared, __dirname: 'readonly', __filename: 'readonly', process: 'readonly', Buffer: 'readonly' }
    },
    rules: {
      // possible errors and best practices
      complexity: ['error', 8],
      'default-case': 'error',
      eqeqeq: 'error',
      'guard-for-in': 'error',
      'no-self-compare': 'error',
      'no-throw-literal': 'error',
      'no-void': 'error',
      'no-var': 'error',
      'prefer-const': 'error',
      'no-unused-vars': ['error', { args: 'after-used', caughtErrors: 'none' }]
    }
  },
  {
    files: ['**/*.mjs'],
    languageOptions: { ecmaVersion: 2025, sourceType: 'module', globals: { console: 'readonly', process: 'readonly' } }
  },
  {
    // node:test and node:assert are required in the test files; the helper manifest is one long list
    files: ['**/*.test.js', 'test/**/*.js'],
    rules: { complexity: 'off' }
  }
];
