const EventEmitter = require("events");

class MyEmitter extends EventEmitter {}

const myEmitter = new MyEmitter();

myEmitter.on("greet", (name) => {
    console.log("Hello " + name + "!");
});

myEmitter.on("exit", () => {
    console.log("Exit event triggered.");
});

myEmitter.emit("greet", "Kartik");

myEmitter.emit("exit");