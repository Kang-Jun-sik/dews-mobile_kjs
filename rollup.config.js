import merge from 'deepmerge';
import { createSpaConfig } from '@open-wc/building-rollup';
import replace from '@rollup/plugin-replace';
import pkg from './package.json';

export default argv => {
  const devMode = argv.dev === 'true';
  delete argv.dev;

  const baseConfig = createSpaConfig({
    developmentMode: devMode,
    injectServiceWorker: false,
    workbox: false,
    polyfillsLoader: false,
    outputDir: devMode ? './.tmp/dist/mobile' : './dist/mobile',
    nodeResolve: true,
    html: {
      flatten: false,
      inject: true,
      publicPath: '/mobile',
      minify: !devMode
    }
  });

  return merge(baseConfig, {
    // 프로젝트 내부 테스트용 index.html
    // input: './index.html',
    input: '/.tmp/src/dews-mobile.js',
    preserveEntrySignatures: true,
    treeshake: true,
    output: {
      sourcemap: devMode,
      entryFileNames: 'js/dews-mobile.js',
      chunkFileNames: devMode ? 'js/dews-mobile.chunk.[name].js' : 'js/dews-mobile.chunk.[hash].js',
      assetFileNames: devMode
        ? 'assets/dews-mobile.assets.[name][extname]'
        : 'assets/dews-mobile.asset.[hash][extname]',
      banner: `/*! ****************************************************************************
 DEWS/UI Mobile Framework v${pkg.version}
 Copyright (c) Douzone Bizon Co.,ltd. All rights reserved.
***************************************************************************** */
`
    },
    plugins: [
      replace({
        __VERSION__: pkg.version
      })
    ]
  });
};
