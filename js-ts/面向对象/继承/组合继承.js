function inherit(children, parent) {
  // 创建对象
  let prototype = Object.create(parent.prototype);
  // 增强对象
  prototype.constructor = children;
  // 指定对象
  children.prototype = prototype;
}

function Parent(name) {
  this.name = name;
  this.num = [0, 1, 2];
}

Parent.prototype.sayName = function () {
  alert(this.name);
};

function Child(name, age) {
  Parent.call(this, name);
  this.age = age;
}

inherit(Child, Parent);

Child.prototype.sayAge = function () {
  console.log(this.age);
};
