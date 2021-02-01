module.exports = {
  stories: ['../**/stories/*.stories.{md,mdx}', '../.tmp/**/stories/*.stories.js'],
  addons: [
    'storybook-prebuilt/addon-knobs/register.js',
    'storybook-prebuilt/addon-docs/register.js',
    'storybook-prebuilt/addon-viewport/register.js',
  ],
  esDevServer: {
    // custom es-dev-server options
    nodeResolve: true,
    watch: true,
    open: true
  },
};
