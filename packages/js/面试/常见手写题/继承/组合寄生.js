function Parent(name) {
    this.name = name;
}

Parent.sayHello = function () {
    console.log('hello');
}

Parent.prototype.sayName = function () {
    console.log('the name', this.name);
}

function child(name, age) {
    Parent.call(this, name);
    this.age = age;
}

function _inherit(child, parent) {
    // 继承parent的原型方法
    child.prototype = Object.create(parent.prototype);
    // 修正constructor指向
    child.prototype.constructor = child;
    // 链接
    child.__proto__ = parent;
}
