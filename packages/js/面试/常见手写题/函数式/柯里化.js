// 完全体
const curry = function (fn) {
  const params = [];
  return function curried(...args) {
    params.push(...args);
    // 不加后面的一个条件的话，只能实现有限个参数的函数的柯里化
    if (params.length === fn.length || args.length === 0) {
      return fn(...params);
    }
    return curried;
  };
};

function sum(...args) {
  return args.reduce((prev, cur) => prev + cur, 0);
}

console.log(curry(sum)(1)(1)(2)(2)(3)());

function sumThree(a, b, c) {
  return a + b + c;
}

console.log(curry(sumThree)(1)(2)(3));
