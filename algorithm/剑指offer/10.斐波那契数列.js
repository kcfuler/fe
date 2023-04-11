/**
 * @param {number} n
 * @return {number}
 */

let m = {};
var fib = function (n) {
  if (m[n]) return m[n];
  if (n == 0) return 0;
  if (n == 1) return 1;
  return (m[n] = (fib(n - 1) + fib(n - 2)) % (1e9 + 7));
};
