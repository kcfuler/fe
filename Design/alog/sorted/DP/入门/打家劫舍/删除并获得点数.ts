/**
 * 转化为打家劫舍问题
 * 统计数字的出现次数，因为题目要求的是 nums[i] - 1 & nums[i] + 1 的元素删除掉，
 * 给定遍历的顺序之后，就只用考虑后面的，因为前面的已经被删除了 => 删除当前的，就不能再删除相邻的了
 */
function deleteAndEarn(nums: number[]): number {
  if (nums === null || nums.length === 0) {
    return 0;
  } else if (nums.length === 1) {
    return nums[0];
  }

  let len = nums.length;
  let max = nums[0];

  for (let i = 0; i < len; i++) {
    max = Math.max(max, nums[i]);
  }

  // 构造一个新的数组 all
  let all = new Array(max + 1).fill(0);
  for (const n of nums) {
    all[n]++;
  }

  let dp = new Array(max + 1).fill(0);
  dp[1] = all[1];

  for (let i = 2; i <= max; i++) {
    dp[i] = Math.max(dp[i - 1], dp[i - 2] + i * all[i]);
  }

  return dp[max];
}
