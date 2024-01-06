const fs = require("fs");

// Функція, яка читає файл
function readFile(path, callback) {
  // Спробуємо прочитати файл
  fs.readFile(path, (err, data) => {
    // Якщо сталася помилка, обробимо її
    if (err) {
      callback(err);
    } else {
      // Якщо помилки не було, повернемо дані
      callback(null, data);
    }
  });
}

// Виклик функції
readFile("./my-file.txt", (err, data) => {
  if (err) {
    console.log("Помилка:", err);
  } else {
    console.log("Дані:", data.toString());
  }
});