#!/usr/bin/env node

const fs = require('fs');
const path = require('path');

module.exports = async function(ctx) {

	if (process.env.COPY_EXTRAS !== 'true') {
		console.log('skip copying of build-extras.gradle');
		return;
	}

	console.log('hook extras');

	const rootdir = process.env.PWD;
  const platformAndroidPath = '/platforms/android/app/';
  const srcFile = path.join(rootdir, 'build-extras.gradle');
  const destFile = path.join(rootdir, platformAndroidPath, 'build-extras.gradle');
  const destDir = path.dirname(destFile);
  if (fs.existsSync(srcFile) && fs.existsSync(destDir)) {
    fs.createReadStream(srcFile).pipe(fs.createWriteStream(destFile));
  } else {
    throw new Error('Unable to copy build-extras.gradle');
  }
};
