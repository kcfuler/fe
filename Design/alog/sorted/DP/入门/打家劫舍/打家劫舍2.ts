function rob(nums: number[]): number {
  if (nums.length === 0) return 0;
  if (nums.length === 1) return nums[0];
  if (nums.length === 2) return Math.max(nums[0], nums[1]);

  // 使用索引，减少空间复杂度
  function robLinear(start: number, end: number): number {
    let prev2 = 0,
      prev1 = 0;

    for (let i = start; i <= end; i++) {
      const current = Math.max(prev1, prev2 + nums[i]);
      prev2 = prev1;
      prev1 = current;
    }

    return prev1;
  }

  return Math.max(robLinear(0, nums.length - 2), robLinear(0, nums.length - 1));
}
