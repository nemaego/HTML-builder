const fs = require('fs');
const path = require('path');
const folderPath = path.join(__dirname, 'secret-folder');

fs.readdir(folderPath, { withFileTypes: true }, (err, files) => {
  if (err) {
    return console.error('Ошибка чтения папки:', err.message);
  }

  files.forEach((file) => {
    if (file.isFile()) {
      const filePath = path.join(folderPath, file.name);
      const fileName = path.parse(file.name).name;
      const fileExt = path.extname(file.name).slice(1);

      fs.stat(filePath, (err, stats) => {
        if (err) {
          return console.error(
            'Ошибка получения информации о файле:',
            err.message,
          );
        }

        const fileSize = (stats.size / 1024).toFixed(2);
        console.log(`${fileName} - ${fileExt} - ${fileSize}kb`);
      });
    }
  });
});
