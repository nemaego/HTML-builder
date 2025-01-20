const fs = require('fs');
const path = require('path');

const sourceDirectory = path.join(__dirname, 'files');
const destinationDirectory = path.join(__dirname, 'files-copy');

function copyDirectory() {
  fs.rm(destinationDirectory, { recursive: true, force: true }, (err) => {
    if (err) throw err;

    fs.mkdir(destinationDirectory, { recursive: true }, (err) => {
      if (err) throw err;

      fs.readdir(sourceDirectory, (err, files) => {
        if (err) throw err;

        files.forEach((file) => {
          const sourceFile = path.join(sourceDirectory, file);
          const destFile = path.join(destinationDirectory, file);

          fs.copyFile(sourceFile, destFile, (err) => {
            if (err) throw err;
          });
        });
        console.log('Скопировано!');
      });
    });
  });
}

copyDirectory();
