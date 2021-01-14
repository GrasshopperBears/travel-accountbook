const { override, addWebpackAlias } = require('customize-cra');
const path = require('path');

module.exports = override(
  addWebpackAlias({
    '@Components': path.resolve(__dirname, 'src/components'),
    '@Pages': path.resolve(__dirname, 'src/pages'),
    '@Services': path.resolve(__dirname, 'src/services'),
    '@Stores': path.resolve(__dirname, 'src/stores'),
    '@Utils': path.resolve(__dirname, 'src/utils'),
  }),
);
