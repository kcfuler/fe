function numbDecoding(s) {
    if (!s || s[0] === '0') return 0;

    let n = s.length;
    let dp = new Array(n + 1).fill(0);
    dp[0] = 1;
    dp[1] = s.charAt(0) === '0' ? 0 : 1;

    for (let i = 2; i <= n; i++) {
        // 因为编码只有1-26，两位数
        let first = parseInt(s.substring(i - 1, i)); // 当前一个数字
        let second = parseInt(s.substring(i - 2, i)); // 当前两个数字组合

        // 如果编一位
        if (first >= 1 && first <= 9) {
            dp[i] += dp[i - 1];
        }
        // 编两位
        if (second >= 10 && second <= 26) {
            dp[i] += dp[i - 2];
        }
    }
    console.log('dp', dp)
    return dp[n];
}

// 不能处理0的情况
console.log(numbDecoding("13445213"));
