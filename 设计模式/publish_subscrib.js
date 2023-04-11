// publish_subscribe 发布订阅模式
// 1. 发布订阅模式是一种一对多的关系
// 2. 事件中心是一个全局的对象，用来存储事件的回调函数
// 3. 事件中心可以订阅和发布事件
// 4. 发布者可以发布事件，订阅者可以订阅事件

// 事件中心
class EventCenter {
  constructor() {
    this.callbacks = {}; // 存储事件的回调函数
  }
  // 订阅事件
  on(eventName, callback) {
    if (!this.callbacks[eventName]) {
      this.callbacks[eventName] = [callback];
    } else {
      this.callbacks[eventName].push(callback);
    }
  }
  // 发布事件
  emit(eventName, data) {
    if (this.callbacks[eventName]) {
      this.callbacks[eventName].forEach((callback) => {
        callback(data);
      });
    }
  }
  // 取消订阅
  off(eventName, callback) {
    if (this.callbacks[eventName]) {
      this.callbacks[eventName] = this.callbacks[eventName].filter((item) => {
        return item !== callback;
      });
    }
  }
}

// 测试
const eventCenter = new EventCenter();
const callback = (data) => {
  console.log(data);
};
eventCenter.on("click", callback);
eventCenter.emit("click", "hello");
eventCenter.off("click", callback);
eventCenter.emit("click", "hello");
