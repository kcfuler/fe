function rob1(nums: number[]): number {
  if (nums.length === 0) return 0;
  if (nums.length === 1) return nums[0];
  if (nums.length === 2) return Math.max(nums[0], nums[1]);

  // dp[i] 表示到第 i 个房屋时能偷窃到的最高金额
  let dp: number[] = new Array(nums.length);
  dp[0] = nums[0];
  dp[1] = Math.max(nums[0], nums[1]);

  for (let i = 2; i < nums.length; i++) {
    /*
     * 对于第i个房子，有两种选择:
     * 1. 不偷第 i 个房子，那么最大金额就是到第 i - 1个房子的最大金额
     * 2. 偷第 i 个房子，那么最大金额就是第 i 个房子的金额加上到第 i - 2个房子的金额
     * */
    dp[i] = Math.max(dp[i - 1], nums[i] + dp[i - 2]);
  }

  // 最后一个房子的最大金额就是答案
  return dp[nums.length - 1];
}
