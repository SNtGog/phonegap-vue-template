const fs = require('fs');
const path = require('path');
const rimraf = require('rimraf');

function copyFileSync(srcFile, target) {
	var destFile = target;

	//if target is a directory. a new file with the same name will be created inside it
	if (fs.existsSync(target)) {
		if (fs.lstatSync(target).isDirectory()) {
			destFile = path.join(target, path.basename(srcFile));
		}
	}

	//console.log('copying ' + srcFile + ' to ' + destFile);
	fs.writeFileSync(destFile, fs.readFileSync(srcFile));
}

function copyFolderRecursiveSync(sourceFolder, targetFolder) {
	var files = null;

	if (!fs.existsSync(targetFolder)) {
		fs.mkdirSync(targetFolder);
	}

	//copy
	if (fs.lstatSync(sourceFolder).isDirectory()) {
		files = fs.readdirSync(sourceFolder) || [];

		files.forEach(function(curSource) {
			var curSourceFull = path.join(sourceFolder, curSource);

			if (fs.lstatSync(curSourceFull).isDirectory()) {
				var curTargetFolder = path.join(targetFolder, path.basename(curSource));
				copyFolderRecursiveSync(curSourceFull, curTargetFolder);
			} else {
				copyFileSync(curSourceFull, targetFolder);
			}
		});
	}
}

function mkDirByPathSync(targetDir, { isRelativeToScript = false } = {}) {
  const sep = path.sep;
  const initDir = path.isAbsolute(targetDir) ? sep : '';
  const baseDir = isRelativeToScript ? __dirname : '.';

  return targetDir.split(sep).reduce((parentDir, childDir) => {
    const curDir = path.resolve(baseDir, parentDir, childDir);
    try {
      fs.mkdirSync(curDir);
    } catch (err) {
      if (err.code === 'EEXIST') { // curDir already exists!
        return curDir;
      }

      // To avoid `EISDIR` error on Mac and `EACCES`-->`ENOENT` and `EPERM` on Windows.
      if (err.code === 'ENOENT') { // Throw the original parentDir error on curDir `ENOENT` failure.
        throw new Error(`EACCES: permission denied, mkdir '${parentDir}'`);
      }

      const caughtErr = ['EACCES', 'EPERM', 'EISDIR'].indexOf(err.code) > -1;
      if (!caughtErr || caughtErr && targetDir === curDir) {
        throw err; // Throw if it's just the last created dir.
      }
    }

    return curDir;
  }, initDir);
}

function clean(path) {
  return new Promise((resolve, reject) => rimraf(path, resolve));
}

module.exports = {
	copyFileSync: copyFileSync,
	copyFolderRecursiveSync: copyFolderRecursiveSync,
	mkDirByPathSync: mkDirByPathSync,
	clean: clean
};