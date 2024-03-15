class EventBus {
  constructor() {
    this.events = {};
  }

  on(eventName, callback, once = false) {
    if (!this.events[eventName]) {
      this.events[eventName] = [];
    }
    this.events[eventName].push({ callback, once });
  }

  off(eventName, callback) {
    if (!this.events[eventName]) {
      console.warn(`Event ${eventName} does not exist`);
      return;
    }

    this.events[eventName] = this.events[eventName].filter((event) => {
      return event.callback !== callback;
    });
  }

  once(eventName, callback) {
    this.on(eventName, callback, true);
  }

  emit(eventName, ...args) {
    if (!this.events[eventName]) {
      console.warn(`Event ${eventName} does not exist`);
      return;
    }

    this.events[eventName].forEach((event) => {
      event.callback(...args);
      if (event.once) {
        this.off(eventName, event.callback);
      }
    });
  }

  clear() {
    this.events = {};
  }
}

// 使用示例
const bus = new EventBus();

function greetName(name) {
  console.log(`Hello, ${name}`);
}
// 注册事件监听器
bus.on("greet", greetName);

// 注册一次性事件监听器
bus.once("bye", (name) => {
  console.log(`Goodbye, ${name}`);
});

// 触发事件
bus.emit("greet", "John"); // 输出 "Hello, John"
bus.emit("bye", "John"); // 输出 "Goodbye, John"

// 再次触发事件
bus.emit("greet", "John"); // 输出 "Hello, John"
bus.emit("bye", "John"); // 不会有输出

// 移除事件监听器
bus.off("greet", greetName);

// 再次触发事件
bus.emit("greet", "John"); // 不会有输出
