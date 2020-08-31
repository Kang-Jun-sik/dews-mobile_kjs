/* eslint-disable */
// import/no-extraneous-dependencies,@typescript-eslint/no-var-requires
const { createDefaultConfig } = require('@open-wc/testing-karma');

const merge = require('deepmerge');

module.exports = config => {
  config.set(
    merge(createDefaultConfig(config), {
      files: [
        // dist/**/**/test 폴더에 .test로 끝나는 모든 파일을 실행합니다.
        {
          pattern: config.grep ? config.grep : 'dist/**/test/**/*.test.js',
          type: 'module',
        },
      ],
      frameworks: ['mocha'],
      esm: {
        nodeResolve: true,
        preserveSymlinks: true,
      },
      // https://github.com/karma-runner/karma-mocha 참고
      client: {
        mocha: {
          ui: 'tdd',
        },
      },
    }),
  );
  return config;
};
