// observer pattern 观察者模式发布订阅模式

// 用于对象间的一对多的依赖关系，当一个对象的状态发生改变时，所有依赖于它的对象都得到通知并被自动更新
// 目标对象，保存状态，状态变化之后触发所有观察者对象
class Subject {
  // 构造函数
  constructor() {
    this.state = 0;
    this.observers = [];
  }
  // 获取状态
  getState() {
    return this.state;
  }
  // 设置状态
  setState(state) {
    this.state = state;
    this.notifyAllObservers();
  }
  // 通知所有观察者
  notifyAllObservers() {
    this.observers.forEach((observer) => {
      observer.update();
    });
  }
  // 添加观察者
  attach(observer) {
    this.observers.push(observer);
  }
}

// 观察者
class Observer {
  // 构造函数
  constructor(name, subject) {
    this.name = name;
    this.subject = subject;
    this.subject.attach(this);
  }
  // 更新
  update() {
    console.log(`${this.name} update, state: ${this.subject.getState()}`);
  }
}
