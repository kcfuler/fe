function wordBreak(s: string, wordDict: string[]): boolean {
    let wordSet = new Set(wordDict);
    // dp[i] 表示，到s[i]为止，s 可以由wordDict中的单词构成
    let dp: boolean[] = new Array(s.length + 1).fill(false);
    dp[0] = true;

    // 以i, j 遍历所有s的字母组合
    for (let i = 1; i <= s.length; i++) {
        for (let j = 0; j < i; j++) {
            // 通过set + substring 方法判断
            if (dp[j] && wordSet.has(s.substring(j, i))) {
                dp[i] = true;
                break;
            }
        }
    }

    return dp[s.length];
}