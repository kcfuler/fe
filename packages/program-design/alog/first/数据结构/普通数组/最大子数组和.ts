// Kadane算法，核心思想是动态规划
function maxSubArray(nums: number[]): number {
  let ans = nums[0], cur = nums[0]; // 这里不取零是为了避免负数情况出错
  for (let i = 0; i < nums.length; i++) {
    cur = Math.max(nums[i], cur + nums[i]) // 局部最优解
    ans = Math.max(cur, ans); // 全局最优解
  }

  return ans;
};