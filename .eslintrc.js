module.exports = {
  root: true,
  parser: '@typescript-eslint/parser',
  plugins: ['@typescript-eslint', 'import', 'html'],
  extends: [
    'eslint:recommended',
    'plugin:@typescript-eslint/eslint-recommended',
    'plugin:@typescript-eslint/recommended',
    'plugin:import/errors',
    'plugin:import/warnings',
  ],
  rules: {
    "prefer-const": ["error", {
      "ignoreReadBeforeAssign": false
    }],
    '@typescript-eslint/no-inferrable-types': 'off',
    '@typescript-eslint/adjacent-overload-signatures': 'error',
    '@typescript-eslint/explicit-function-return-type': 'off',
    // '@typescript-eslint/explicit-function-return-type': 'off',
    '@typescript-eslint/no-non-null-assertion': 'off',
    '@typescript-eslint/no-unused-vars': 'off',
    '@typescript-eslint/quotes': 'off',
    '@typescript-eslint/no-empty-function' : 'off',
    'spaced-comment': ['error', 'always'],
    'import/named': 'off',
    'import/no-unresolved': 'off',
    'import/extensions': ['error', 'always', { ignorePackages: true }],
  },
  env: {
    mocha: true,
  },
};


