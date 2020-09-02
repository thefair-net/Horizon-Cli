const fs = require('fs');

function readFile(sourcePath) {
  return new Promise(resolve => {
    fs.readFile(sourcePath, function (err, data) {
      if (err) throw err;
      resolve(data);
    });
  })
}

function writeFile(data, targetPath) {
  return new Promise(resolve => {
    fs.writeFile(targetPath, data, function (error) {
      if (error) {
        throw error;
      } else {
        resolve()
      }
    });
  })
}

async function copyFile(sourcePath, targetPath) {
  const data = await readFile(sourcePath)
  await writeFile(data, targetPath)
}

module.exports = {
  copyFile
};
