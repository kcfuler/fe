// 创建 WeakMap 对象的实例
let human = new WeakMap();
// 创建⼀个对象，并将其赋值给名为 man 的变量
let man = { name: "xiaan" };
// 调⽤ human 的 set ⽅法，并传递两个参数(键和值)给它
human.set(man, "done");
man = null;
console.log(human);
