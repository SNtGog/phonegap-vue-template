#!/usr/bin/env node

const path = require('path');
const utils = require('./utils');

const ROOT_DIR = process.env.PWD;
const DIRS_TO_COPY = [{
	srcDir: "res/graphics/drawable-mdpi",
	destDir: "platforms/ios/www/img/1x"
},{
	srcDir: "res/graphics/drawable-xhdpi",
	destDir: "platforms/ios/www/img/2x"
},{
	srcDir: "res/graphics/drawable-xxhdpi",
	destDir: "platforms/ios/www/img/3x"
}];

module.exports = async function(ctx) {
	console.log('hook graphics');

	await utils.clean('platforms/ios/www/img')
	DIRS_TO_COPY.forEach(function(dirInfo) {
		const srcDirFull = path.join(ROOT_DIR, dirInfo.srcDir);
		const destDirFull = path.join(ROOT_DIR, dirInfo.destDir);
		utils.mkDirByPathSync(destDirFull);
		utils.copyFolderRecursiveSync(srcDirFull, destDirFull);
	});
};

