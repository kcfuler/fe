function Person(name, age) {
  this.name = name;
  this.age = age;
}
Person.say = () => {
  console.log("I'm a person!");
};
function Man(name, age, address) {
  Person.call(this, name, age);
  this.address = address;
}
Man.speak = () => {
  console.log("I'm a man!");
};
Reflect.setPrototypeOf(Man, Person);
Man.prototype.constructor = Man;
const person = new Person("person", 10);
const man = new Man("man", 11, "Tokyo");
Man.say();
Man.speak();
