// 好像是完全背包
function coinChange(coins: number[], amount: number): number {
    // dp[i] 表示组成到 i 总数，所用的最小硬币数量
    const dp = new Array(amount + 1).fill(amount + 1);
    dp[0] = 0;

    for (let i = 1; i <= amount; i++) {
        for (const coin of coins) {
            if (coin <= i) {
                dp[i] = Math.min(dp[i], dp[i - coin] + 1);
            }
        }
    }

    return dp[amount] > amount ? -1 : dp[amount]
}