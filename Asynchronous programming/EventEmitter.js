const { EventEmitter } = require("events");

// Новий об'єкт event emitter
const emitter = new EventEmitter();

// Підписуємось на події
emitter.on("click", () => console.log("Clicked!"));
emitter.on("touch", () => console.log("Touched!"));

// Події
emitter.emit("click")
emitter.emit("touch")