/**
 * @param {number[]} prices
 * @param {number} n - 最大交易次数
 * @return {number}
 */
function maxProfit(prices, n) {
  if (!Array.isArray(prices) || prices.length <= 1 || n <= 0) return 0;

  const days = prices.length;

  // 创建一个二维数组来存储状态
  // dp[i][j] 表示在第i天完成j次交易的最大利润
  // j的范围是0到2n，因为我们需要考虑买入和卖出状态
  const dp = Array.from({ length: days }, () => new Array(2 * n + 1).fill(0));

  // 初始化第一天的状态
  for (let j = 1; j <= 2 * n; j += 2) {
    dp[0][j] = -prices[0]; // 买入状态
  }

  // 动态规划过程
  for (let i = 1; i < days; i++) {
    for (let j = 0; j <= 2 * n; j++) {
      if (j === 0) {
        // 不进行任何交易
        dp[i][j] = dp[i - 1][j];
      } else if (j % 2 === 1) {
        // 买入状态
        dp[i][j] = Math.max(dp[i - 1][j], dp[i - 1][j - 1] - prices[i]);
      } else {
        // 卖出状态
        dp[i][j] = Math.max(dp[i - 1][j], dp[i - 1][j - 1] + prices[i]);
      }
    }
  }

  // 返回最后一天完成任意次数交易（但不超过n次）的最大利润
  if (dp[days - 1] && Array.isArray(dp[days - 1])) {
    return Math.max(...dp[days - 1].filter((_, index) => index % 2 === 0));
  } else {
    return 0; // 如果 dp[days-1] 不存在或不是数组，返回 0
  }
}

// 测试代码
try {
  const prices = [3, 3, 5, 0, 0, 3, 1, 4];
  console.log(maxProfit(prices, 2)); // 应该输出: 6
  console.log(maxProfit(prices, 3)); // 应该输出: 6
  console.log(maxProfit([], 2)); // 应该输出: 0
  console.log(maxProfit([1], 2)); // 应该输出: 0
  console.log(maxProfit([1, 2], 0)); // 应该输出: 0
} catch (error) {
  console.error("发生错误:", error);
}
