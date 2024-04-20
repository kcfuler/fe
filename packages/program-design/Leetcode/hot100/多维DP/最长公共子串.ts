// 经典LCS
function longestCommonSubsequence(text1: string, text2: string): number {
    const len1 = text1.length, len2 = text2.length;
    // dp[i][j] 表示 text1从0->i,text2从0 -> j， 最长公共子序列的长度
    const dp: number[][] = new Array(len1 + 1).fill(0).map(() => new Array(len2 + 1).fill(0));

    /*
    * 两种情况
    * 1. 相等
    * 2. 不相等
    * */
    for (let i = 1; i <= len1; i++) {
        for (let j = 1; j <= len2; j++) {
            if (text1[i - 1] === text2[j - 1]) {
                dp[i][j] = dp[i - 1][j - 1] + 1;
            } else {
                dp[i][j] = Math.max(dp[i - 1][j], dp[i][j - 1]);
            }
        }
    }

    return dp[len1][len2];
}