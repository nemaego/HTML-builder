const fs = require('fs');
const path = require('path');

const stylesFolder = path.join(__dirname, 'styles');
const outputFolder = path.join(__dirname, 'project-dist');
const outputFile = path.join(outputFolder, 'new-css-file.css');

async function mergeStyles() {
  try {
    if (!fs.existsSync(outputFolder)) {
      fs.mkdirSync(outputFolder);
    }

    const writeStream = fs.createWriteStream(outputFile);

    const files = await fs.promises.readdir(stylesFolder);

    for (const file of files) {
      const pathToFile = path.join(stylesFolder, file);
      const fileExt = path.extname(file);

      if (fileExt === '.css') {
        const data = await fs.promises.readFile(pathToFile, 'utf8');
        writeStream.write(data + '\n');
      }
    }

    console.log('Сделано! Стили успешно объединены!');
    writeStream.end();
  } catch (error) {
    console.error('Ошибка при объединении:', error.message);
  }
}

mergeStyles();
