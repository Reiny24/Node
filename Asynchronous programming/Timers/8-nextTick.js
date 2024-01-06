const fs = require('fs');

fs.readFile('filename', () => {
  console.log('Файл прочитано');
  process.nextTick(() => {
    console.log('Файл оброблено');
  });
});