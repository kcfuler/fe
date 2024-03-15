// babel 默认转化的代码并没有进行处理, 它只是执行了一个ast的构造和扫描的流程

// 1. 在es6中定义常量
const message = "hello world";
console.log(message);
// 2. es6中的箭头函数
const foo = () => {
  console.log("foo function exec");
};
foo();
