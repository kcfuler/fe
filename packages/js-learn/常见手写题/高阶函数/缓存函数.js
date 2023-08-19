// 其实就是compose函数， 从左到右执行
const multi10 = function (x) {
  return x * 10;
};
const add100 = function (x) {
  return x + 100;
};

const compose = function (f, g) {
  return function (x) {
    return f(g(x));
  };
};

let compute = compose(multi10, add100);

console.log(compute(20));
