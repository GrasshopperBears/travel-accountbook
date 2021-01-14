const { override, addWebpackAlias } = require('customize-cra');
const path = require('path');

module.exports = override(
  addWebpackAlias({
    '@components': path.resolve(__dirname, 'src/components'),
    '@pages': path.resolve(__dirname, 'src/pages'),
    '@services': path.resolve(__dirname, 'src/services'),
    '@stores': path.resolve(__dirname, 'src/stores'),
    '@utils': path.resolve(__dirname, 'src/utils'),
    '@layouts': path.resolve(__dirname, 'src/layouts'),
  }),
);
