const fs = require("fs");

// Функція, яка читає файл
function readFile(path) {
    // Створюємо Promise
    return new Promise((resolve, reject) => {
        // Спробуємо прочитати файл
        fs.readFile(path, (err, data) => {
            // Якщо сталася помилка, обробимо її
            if (err) reject(err);
            // Якщо помилки не було, повернемо дані
            else resolve(data);
        });
    });
}

// Виклик функції
readFile("./my-file.txt")
// Дані були прочитані успішно
.then((data) => console.log("Дані:", data.toString()))
// Сталася помилка
.catch((err) => console.log("Помилка:", err));