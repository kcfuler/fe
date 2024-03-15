// 每个系列的产品需要实现的接口
interface Chair {
  hasLegs: () => void;
  sitOn: () => void;
}

class VictorianChair implements Chair {
  hasLegs: () => void;
  sitOn: () => void;
}

class ModernChair implements Chair {
  sitOn: () => void;
  hasLegs: () => void;
}

// 工厂对用户提供的统一的接口
interface Factory {
  createChair: () => Chair;
  // ...
}

// 面向抽象工厂的具体工厂
class ConcentrateFactory implements Factory {
  createChair: () => Chair;
}

/**
 * 面向用户的抽象工厂
 * 输入一般不是用户来提供
*/
function abstractFactory(): Factory {
  // input .. 可以在这里添加输入的选择
  return new ConcentrateFactory();
}