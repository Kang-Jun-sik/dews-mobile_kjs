const rollup = require('rollup');
const path = require('path');
const loadConfigFile = require('rollup/dist/loadConfigFile.js');

loadConfigFile(path.resolve('rollupTest.config.js'), { format: 'es' }).then(async ({ options, warnings }) => {
  warnings.flush();
  // eslint-disable-next-line no-undef
  if (process.argv[2] === '-file') {
    // eslint-disable-next-line no-undef
    options[0].input = process.argv[3];
  }
  for (const optionsObj of options) {
    const bundle = await rollup.rollup(optionsObj);
    // eslint-disable-next-line no-undef
    await Promise.all(optionsObj.output.map(bundle.write));
  }
});
