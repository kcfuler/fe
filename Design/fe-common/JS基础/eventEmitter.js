class EventEmitter {
  constructor() {
    this.callbacks = {};
  }
  addListener(type, callback) {
    if (!this.callbacks[type]) {
      this.callbacks[type] = [];
    }
    this.callbacks[type].push(callback);
  }
  prependListener(type, callback) {
    if (!this.callbacks[type]) {
      this.callbacks[type] = [];
    }
    this.callbacks[type].unshift(callback);
  }
  on(type, callback) {
    this.addListener(type, callback);
  }
  removeListener(type, callback) {
    if (!this.callbacks[type]) {
      console.warn("没有订阅该事件！");
      return;
    }
    const index = this.callbacks[type].indexOf(callback);
    if (index > -1) {
      this.callbacks[type].splice(index, 1);
    }
  }
  off(type, callback) {
    this.removeListener(type, callback);
  }
  emit(type, ...args) {
    if (!this.callbacks[type]) {
      console.warn("没有订阅该事件！");
      return;
    }
    this.callbacks[type].forEach((callback) => callback.apply(this, args));
  }
  once(type, callback) {
    function wrapper(...params) {
      callback.apply(this, params);
      this.removeListener(type, wrapper);
    }
    this.addListener(type, wrapper);
  }
}
const ee = new EventEmitter();

// 注册所有事件
ee.once("wakeUp", (name) => {
  console.log(`${name} 1`);
});
ee.on("eat", (name) => {
  console.log(`${name} 2`);
});
ee.on("eat", (name) => {
  console.log(`${name} 3`);
});
const meetingFn = (name) => {
  console.log(`${name} 4`);
};
ee.on("work", meetingFn);
ee.on("work", (name) => {
  console.log(`${name} 5`);
});
ee.emit("wakeUp", "xx");
ee.emit("wakeUp", "xx"); // 第二次没有触发
ee.emit("eat", "xx");
ee.emit("work", "xx");
ee.off("work", meetingFn); // 移除事件
ee.emit("work", "xx"); // 再次工作
