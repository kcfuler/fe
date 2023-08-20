/**
 * @param {number} n
 * @param {number} k
 * @return {number}
 */
var minimumSum = function (n, k) {
  let selected = new Set();
  let sum = 0;
  let current = 1;

  for (let i = 0; i < n; i++) {
    while (selected.has(current) || selected.has(k - current)) {
      current++;
    }
    sum += current;
    selected.add(current);
  }

  return sum;
};
