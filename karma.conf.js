/* eslint-disable @typescript-eslint/no-var-requires,no-undef */
const { createDefaultConfig } = require('@open-wc/testing-karma');
const merge = require('deepmerge');

module.exports = config => {
  const defaultConfig = createDefaultConfig(config);
  config.set(
    merge(defaultConfig, {
      files: [
        // runs all files ending with .test in the test folder,
        // can be overwritten by passing a --grep flag. examples:
        //
        // npm run test -- --grep test/foo/bar.test.js
        // npm run test -- --grep test/bar/*
        {
          pattern: config.grep ? config.grep : '.tmp/**/test/**/*.test.js',
          type: 'module'
        }
      ],

      esm: {
        nodeResolve: true
      }
      // you can overwrite/extend the config further
    })
  );
  return config;
};
