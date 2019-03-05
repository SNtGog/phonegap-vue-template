var TypeScriptAsset = require('parcel-bundler/src/assets/TypeScriptAsset.js')
var autoprefixer = require('autoprefixer');

module.exports = {
  publicPath: '',
  extractCSS: true,
  postcss: [autoprefixer()],
  customCompilers: {
    ts: function(content, cb, compiler, filePath) {
      let ts = new TypeScriptAsset(filePath, {}, { rootDir: filePath })
      ts.contents = content
      ts.process().then(res => {
        cb(null, res.js)
      })
    }
  }
}
