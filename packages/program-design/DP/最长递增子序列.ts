function lengthOfLIS(nums: number[]): number {
    // dp[i] 表示以 nums[i] 结尾的最长递增子序列的长度
    // 初始都为1，最差也有它自己
    const dp = new Array(nums.length + 1).fill(1);
    let maxLen = 1;

    for (let i = 0; i < nums.length; i++) {
        for (let j = 0; j < i; j++) {
            if (nums[j] < nums[i])
                dp[i] = Math.max(dp[i], dp[j] + 1);
        }
        maxLen = Math.max(maxLen, dp[i]);
    }

    return maxLen;
}