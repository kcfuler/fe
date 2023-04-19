const myObj = {};
myObj[Symbol.iterator] = function* () {
  yield 1;
  yield 2;
  yield 3;
};

console.log([...myObj]); // [1, 2, 3]
