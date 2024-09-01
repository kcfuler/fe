/**
 *
 * @param {*} n
 * @param {*} a
 * @param {*} b
 * @abstract 1. 什么是尾调用; 2. 尾调用的优化原理
 * @returns
 */

const fib = (n, a = 0, b = 1) => {
  if (n === 0) {
    return a;
  }

  return fib(n - 1, b, a + b);
};

console.log(fib(1000));
