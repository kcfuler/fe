// 在对象内
// const obj = {
//   name: "li hua",
//   foo: () => {
//     console.log(this.prototype);
//     console.log(this.name);
//   },
//   foo1() {
//     console.log(this.name);
//     console.log(this);
//   },
// };
// obj.foo1();
// 在函数内
function test() {
  const name = "li hua";
  const foo = () => {
    console.log("arr => this : ", this == globalThis); // true
    console.log("arr => this.name : ", this.name);
    console.log("arr => name: ", name);
  };
  function foo1() {
    // console.log(this == globalThis);
    console.log(this.name);
    console.log(name);
  }

  // foo();
  foo1();
}

test();
