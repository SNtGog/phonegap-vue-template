const gulp = require('gulp');
const execSync = require('child_process').execSync;
const Bundler = require('parcel-bundler');
const Path = require('path');
const fs = require( 'fs' );
const rimraf = require('rimraf');
const envConfig = require('dotenv').config({ path: `.env.${process.env.NODE_ENV}` });

function clean(path) {
  return new Promise((resolve, reject) => rimraf(path, resolve));
}

let isDevelopment = true;

function _bundle( optionOverrides = {}) {
  const options = Object.assign({
    outDir: process.env.OUT_DIR, // The out directory to put the build files in, defaults to dist
    // outFile: '/widget/widget.html', // The name of the outputFile

    // must be set to relative otherwise in widget.html the injection are absolute path and break
    publicUrl: '/', // The url to serve on, defaults to dist

    watch: true, // Whether to watch the files and rebuild them on change, defaults to process.env.NODE_ENV !== 'production'
    cache: true, // Enabled or disables caching, defaults to true
    cacheDir: '.cache', // The directory cache gets put in, defaults to .cache
    contentHash: false, // Disable content hash from being included on the filename
    global: 'moduleName', // Expose modules as UMD under this name, disabled by default
    minify: !isDevelopment, // Minify files, enabled if process.env.NODE_ENV === 'production'
    scopeHoist: false, // Turn on experimental scope hoisting/tree shaking flag, for smaller production bundles
    target: 'browser', // Browser/node/electron, defaults to browser
    // https: { // Define a custom {key, cert} pair, use true to generate one or false to use http
    //   cert: './ssl/cert.pem', // Path to custom certificate
    //   key: './ssl/key.pem' // Path to custom key
    // },
    logLevel: 3, // 5 = save everything to a file, 4 = like 3, but with timestamps and additionally log http requests to dev server, 3 = log info, warnings & errors, 2 = log warnings & errors, 1 = log errors
    hmr: process.env.BROWSER_RELOAD, // Enable or disable HMR while watching
    hmrPort: 0, // The port the HMR socket runs on, defaults to a random free port (0 in node.js resolves to a random free port)
    hmrHostname: '', // A hostname for hot module reload, default to ''
    sourceMaps: isDevelopment, // Enable or disable sourcemaps, defaults to enabled (minified builds currently always create sourcemaps)
    detailedReport: true // Prints a detailed report of the bundles, assets, filesizes and times, defaults to false, reports are only printed if watch is disabled
  }, optionOverrides);

  const entryFiles = [
    Path.join(__dirname, './src/index.html')
  ];

  // Initializes a bundler using the entrypoint location and options provided
  const bundler = new Bundler(entryFiles, options);

  return bundler;
}

async function serveTask( done ) {
  const bundler = _bundle();

  bundler.on('buildEnd', () => {
    console.log('bundler: buildEnd');
  });

  if (process.env.NODE_ENV === 'browser') {
    await bundler.serve(3000);
  }
  done();
}

async function prepareTask( done ) {
  fs.existsSync("./www") || fs.mkdirSync("./www");
  await clean('./www/*');

  execSync(`phonegap prepare ${process.env.NODE_ENV} --verbose`, {stdio: 'inherit'});
  done();
}

function setProductionMode(done) {
  this.isDevelopment = false;
  done();
}

gulp.task('dev', gulp.series([prepareTask, serveTask]));
gulp.task('production', gulp.series([setProductionMode, prepareTask, serveTask]));