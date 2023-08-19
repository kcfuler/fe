// strategy pattern 策略模式
//
// 定义了算法族，分别封装起来，让它们之间可以互相替换，此模式让算法的变化独立于使用算法的客户
// 一个基于策略模式的程序至少由两部分组成。第一个部分是一组策略类（可变），策略类封装了具体的算法，并负责具体的计算过程
// 第二个部分是环境类Context（不变），Context接受客户的请求，随后把请求委托给某一个策略类
// 要做到这点，说明Context中要维持对某个策略对象的引用

// 策略类
class Strategy {
  // 策略算法
  algorithmInterface() {
    throw new Error("This method you must to overwrite!");
  }
}
// 具体策略类A
class ConcreteStrategyA extends Strategy {
  algorithmInterface() {
    console.log("算法A实现");
  }
}
// 具体策略类B
class ConcreteStrategyB extends Strategy {
  algorithmInterface() {
    console.log("算法B实现");
  }
}
// 具体策略类C
class ConcreteStrategyC extends Strategy {
  algorithmInterface() {
    console.log("算法C实现");
  }
}
// 环境类
class Context {
  // 构造函数
  constructor() {
    this.strategy = null;
  }
  // 设置具体策略
  setStrategy(strategy) {
    this.strategy = strategy;
  }
  // 策略方法
  doSomeBusinessLogic() {
    console.log("doSomeBusinessLogic");
    this.strategy.algorithmInterface();
  }
}
// 客户端代码
const context = new Context();
context.setStrategy(new ConcreteStrategyA());
context.doSomeBusinessLogic();
context.setStrategy(new ConcreteStrategyB());
context.doSomeBusinessLogic();
context.setStrategy(new ConcreteStrategyC());
context.doSomeBusinessLogic();
