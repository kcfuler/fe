function Foo(name, age) {
  this.name = name;
  this.age = age;
}

let f1 = new Foo("name", 12);
// console.log(f1.__proto__ === Foo.prototype); // true;
// console.log(Object.constructor === Function); // false
// console.log(Function.prototype === Function.__proto__); // true;
console.log(Function.prototype.__proto__ === Object.prototype);
