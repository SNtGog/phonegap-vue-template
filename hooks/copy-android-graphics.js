#!/usr/bin/env node

const path = require('path');
const utils = require('./utils');

const ROOT_DIR = process.env.PWD;
const DIRS_TO_COPY = [{
	srcDir: "res/graphics",
	destDir: "platforms/android/app/src/main/res"
}];

module.exports = async function(ctx) {

	if (process.env.COPY_GRAPHICS !== 'true') {
		console.log('skip copying of resources');
		return;
	}

	console.log('hook graphics');

	DIRS_TO_COPY.forEach(function(dirInfo) {
		var srcDirFull = path.join(ROOT_DIR, dirInfo.srcDir);
		var destDirFull = path.join(ROOT_DIR, dirInfo.destDir);
		utils.mkDirByPathSync(destDirFull);
		utils.copyFolderRecursiveSync(srcDirFull, destDirFull);
	});

	await utils.clean('platforms/android/app/src/main/assets/www/img');
};