function uniquePaths(m: number, n: number): number {
    // 初始化第一行和第一列为1（其它位置的答案都会被覆盖）
    const dp: number[][] = new Array(m).fill(0).map(() => new Array(n).fill(1));

    // 从上或者从左
    for (let i = 1; i < m; i++) {
        for (let j = 1; j < n; j++) {
            dp[i][j] = dp[i - 1][j] + dp[i][j - 1];
        }
    }

    return dp[m - 1][n - 1];
}