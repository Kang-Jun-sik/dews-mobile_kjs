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
    '@typescript-eslint/adjacent-overload-signatures': 'error',
    '@typescript-eslint/explicit-function-return-type': 'off', // 함수 및 클래스 메서드에 대한 명시적 반환 여부
    '@typescript-eslint/no-non-null-assertion': 'off', // !널이 아닌 어설션을 허용 여부
    '@typescript-eslint/no-unused-vars': 'off', // 사용하지 않는 변수 허용 여부
    '@typescript-eslint/quotes': 'off',
    'spaced-comment': ['error', 'always'], // 주석에서 //,/* 뒤에 일관된 간격을 적용 여부
    'import/named': 'off',
    'import/no-unresolved': 'off',
    'import/extensions': ['error', 'always', { ignorePackages: true }], //import path를 위한 규칙
  },
  env: {
    mocha: true,
  },
};
