const fs = require('fs');

myfile = "../my-file.txt"

fs.readFile(myfile, () => {
  setTimeout(() => {
    console.log('timeout');
  }, 0);
  setImmediate(() => {
    console.log('immediate');
  });
});