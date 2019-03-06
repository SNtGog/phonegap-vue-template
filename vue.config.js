var TypeScriptAsset = require('parcel-bundler/src/assets/TypeScriptAsset.js')
var autoprefixer = require('autoprefixer');

module.exports = {
  publicPath: '/',
  extractCSS: true,
  postcss: [autoprefixer()]
}
