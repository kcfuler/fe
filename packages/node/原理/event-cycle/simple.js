class EventSystem {
  constructor() {
    // 任务队列
    this.queue = [];
  }

  // 追加任务
  enQueue(func) {
    this.queue.push(func);
  }

  // 事件循环
  run() {
    while (1) {
      while (this.queue.length) {
        const func = this.queue.shift();
        func();
      }
    }
  }
}
// 新建一个事件循环系统
const eventSystem = new EventSystem();

// 生产任务
eventSystem.enQueue(() => {
  console.log("hi");
});

// 启动事件循环
eventSystem.run();

// 生产任务
eventSystem.enQueue(() => {
  console.log("hi");
});
