/**
 * 原型模式: 创建对象，与其他对象解耦
 * 
*/

interface Prototype {
  clone(): Prototype;
}

class ConcretePrototype implements Prototype {
  private field: number;

  constructor(source?: ConcretePrototype) {
    this.field = source ? source.field : 0;
  }

  clone(): Prototype {
    return new ConcretePrototype(this);
  }
}

function clientCode() {
  const prototype = new ConcretePrototype();
  const clonePrototype = prototype.clone();

  console.log(prototype === clonePrototype); // 输出: false
  console.log(clonePrototype instanceof ConcretePrototype); // 输出: true
}

clientCode();
