interface Builder {
  producePartA(): Builder;
  producePartB(): Builder;
  producePartC(): Builder;
}

// 产品类
class Product1 {
  public parts: string[] = [];

  public listParts(): void {
    console.log(`Product parts: ${this.parts.join(', ')}\n`);
  }
}

/**
 * 具体的建造者类
 * 实现了建造者接口
 * 用于定义产品的组成部分的具体实现
 * 并且提供了检索产品的方法
 * 也可以返回产品的实例，通过返回自身实现链式调用
 */
class ConcreteBuilder implements Builder {
  private product: Product1;

  constructor() {
    this.product = new Product1();
  }

  public reset(): Builder {
    this.product = new Product1();
    return this;
  }

  public producePartA(): Builder {
    this.product.parts.push('PartA1');
    return this;
  }

  public producePartB(): Builder {
    this.product.parts.push('PartB1');
    return this;
  }

  public producePartC(): Builder {
    this.product.parts.push('PartC1');
    return this;
  }

  public getProduct(): Product1 {
    const result = this.product;
    this.reset();
    return result;
  }
}

/**
 * 指挥者类
 * 用于定义构建步骤的顺序
 * 以及控制构建步骤的执行
 */
class Director {
  private builder: Builder;

  public setBuilder(builder: Builder): void {
    this.builder = builder;
  }

  public buildMinimalViableProduct(): void {
    this.builder.producePartA();
  }

  public buildFullFeaturedProduct(): void {
    this.builder.producePartA().producePartB().producePartC();
  }
}
// const builder = new ConcreteBuilder();
// // builder.reset().producePartA().producePartB();
// console.log('builder', builder.producePartA().producePartB())

// test case
// const director = new Director();
// const builder = new ConcreteBuilder();
// director.setBuilder(builder);
