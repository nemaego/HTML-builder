const fs = require('fs');
const path = require('path');

const pathToFile = path.join(__dirname, 'user_input.txt');
const stream = fs.createWriteStream(pathToFile, { flags: 'a' });

console.log('Привет! :3 Введите текст для записи в файл.');
console.log('Для выхода напишите "exit" или можно нажать Ctrl+C.');

process.stdin.setEncoding('utf-8');

process.stdin.on('data', (text) => {
  const trimmedText = text.trim();
  if (trimmedText.toLowerCase() === 'exit') {
    console.log('Завершила. Спасибо за использование! Пока!');
    stream.end();
    process.exit(0);
  }
  stream.write(trimmedText + '\n', (error) => {
    if (error) {
      console.error('Ошибка записи в файл:', error.message);
    } else {
      console.log(
        'Все записано! Введите ещё текст или можете нписать "exit" для выхода.',
      );
    }
  });
});

process.on('SIGINT', () => {
  console.log('\nПрограмма завершена. Пока-пока!');
  stream.end();
  process.exit(0);
});
