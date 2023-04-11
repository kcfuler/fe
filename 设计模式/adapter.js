// adapter pattern 适配器模式
//
// 将一个类的接口转换成客户希望的另一个接口，适配器模式使得原本由于接口不兼容而不能一起工作的那些类可以一起工作
// 适配器模式分为类适配器模式和对象适配器模式
//
// 适配器模式分为三种角色：目标接口（Target）、适配器（Adapter）、被适配者（Adaptee）
// 适配器模式的目的是解决两个软件实体间的接口不兼容问题，它不改变已有的接口和功能，只是提供一个不同的接口，使得客户端能够兼容
//
// 类适配器模式
//
// 类适配器模式是通过继承的方式实现适配器功能的
//
// 适配器类
class Adapter extends Adaptee {
  // 目标接口
  targetInterface() {
    console.log("Adapter targetInterface");
  }
}
// 被适配者类
class Adaptee {
  // 被适配者的接口
  specificRequest() {
    console.log("Adaptee specificRequest");
  }
}
// 客户端代码
const adapter = new Adapter();
adapter.specificRequest();
adapter.targetInterface();
