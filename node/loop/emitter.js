const EventEmitter = require("events");

class MyEmitter1 extends EventEmitter {
  constructor() {
    super();
    this.emit("event"); // 不能触发
  }
}

const myEmitter1 = new MyEmitter1();
myEmitter1.on("event", () => {
  console.log("an event occurred!");
});

class MyEmitter extends EventEmitter {
  constructor() {
    super();

    // use nextTick to emit the event once a handler is assigned
    process.nextTick(() => {
      this.emit("event");
    });
  }
}

const myEmitter = new MyEmitter();
myEmitter.on("event", () => {
  console.log("an event occurred!");
});
