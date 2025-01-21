const fs = require('fs');
const path = require('path');

const projectDist = path.join(__dirname, 'project-dist');
const templateFile = path.join(__dirname, 'template.html');
const componentsFolder = path.join(__dirname, 'components');
const stylesFolder = path.join(__dirname, 'styles');
const assetsFolder = path.join(__dirname, 'assets');
const outputHTML = path.join(projectDist, 'index.html');
const outputCSS = path.join(projectDist, 'style.css');
const outputAssets = path.join(projectDist, 'assets');

async function createProjectDist() {
  await fs.promises.mkdir(projectDist, { recursive: true });
}
async function buildHTML() {
  try {
    let template = await fs.promises.readFile(templateFile, 'utf8');
    const componentFiles = await fs.promises.readdir(componentsFolder);

    for (const file of componentFiles) {
      const filePath = path.join(componentsFolder, file);
      const ext = path.extname(file);
      const name = path.basename(file, ext);

      if (ext === '.html') {
        const componentContent = await fs.promises.readFile(filePath, 'utf8');
        template = template.replace(`{{${name}}}`, componentContent);
      }
    }

    await fs.promises.writeFile(outputHTML, template);
    console.log('Ура! HTML файл успешно собран!');
  } catch (error) {
    console.error('Ой! Ошибка при сборке HTML:', error.message);
  }
}
async function mergeStyles() {
  try {
    const files = await fs.promises.readdir(stylesFolder);
    const writeStream = fs.createWriteStream(outputCSS);

    for (const file of files) {
      const filePath = path.join(stylesFolder, file);
      const ext = path.extname(file);

      if (ext === '.css') {
        const data = await fs.promises.readFile(filePath, 'utf8');
        writeStream.write(data + '\n');
      }
    }

    writeStream.end();
    console.log('Ура! CSS файлы успешно объединены!');
  } catch (error) {
    console.error('Ой! Ошибка при сборке CSS:', error.message);
  }
}
async function copyAssets(src, dest) {
  try {
    await fs.promises.mkdir(dest, { recursive: true });
    const items = await fs.promises.readdir(src, { withFileTypes: true });

    for (const item of items) {
      const srcPath = path.join(src, item.name);
      const destPath = path.join(dest, item.name);

      if (item.isDirectory()) {
        await copyAssets(srcPath, destPath);
      } else {
        await fs.promises.copyFile(srcPath, destPath);
      }
    }

    console.log('Ура! Assets успешно скопированы!');
  } catch (error) {
    console.error('Ой! Ошибка при копировании assets:', error.message);
  }
}
async function buildPage() {
  try {
    await createProjectDist();
    await buildHTML();
    await mergeStyles();
    await copyAssets(assetsFolder, outputAssets);
    console.log('Ура! Весь проект успешно собран! Поздравляю!');
  } catch (error) {
    console.error('Ой! Ошибка при сборке проекта:', error.message);
  }
}
buildPage();
