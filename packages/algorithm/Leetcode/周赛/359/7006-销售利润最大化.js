/**
 * @param {number} n
 * @param {number[][]} offers
 * @return {number}
 */
var maximizeTheProfit = function (n, offers) {
  // 构建二维数组的新方式！
  const groups = Array.from({ length: n }, () => []);

  for (const [st, end, gold] of offers) {
    groups[end].push([st, gold]);
  }

  const f = new Array(n + 1).fill(0);
  // 这种处理没有重复end的问题
  for (let end = 0; end < n; end++) {
    const g = groups[end];
    f[end + 1] = f[end];
    for (const [st, gold] of g) {
      f[end + 1] = Math.max(f[end + 1], f[st] + gold);
    }
  }

  return f[n];
};
