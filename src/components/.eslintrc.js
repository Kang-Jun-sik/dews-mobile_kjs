module.exports = {
  extends: '../../.eslintrc',
  rules: {
    '@typescript-eslint/no-unused-vars': ['warn', { argsIgnorePattern: '^e$' }]
  }
};
