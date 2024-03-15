function numSquares(n: number): number {
    let dp: number[] = new Array(n + 1).fill(Number.MAX_VALUE);
    dp[0] = 0;

    // 类似于找零问题，对每一个 n 都在之前的数据里面找一遍，由最初的1推到最后的n
    for (let i = 1; i <= n; i++) {
        // 转移方程, 在所有小于 i 的数中更新dp
        for (let j = 1; j * j <= i; j++) {
            dp[i] = Math.min(dp[i], dp[i - j * j] + 1);
        }
    }

    return dp[n]
}