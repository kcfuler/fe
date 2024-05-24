// 使用原地哈希的思路
function firstMissingPositive(nums: number[]): number {
  const n = nums.length;

  // 将所有小于等于0的数替换为n+1
  for (let i = 0; i < n; i++){
    if (nums[i] <= 0) {
      nums[i] = n + 1;
    }
  }

  // 使用原地哈希
  // 将数组中的每个正整数 num 放置到数组中 num - 1 的索引位置上，同时使用负号作为标记，表示该位置的数已经存在。
  for (let i = 0; i < n; i++) {
    const num = Math.abs(nums[i]); // 因为之前可能已经被标记为负数了，所以这里取绝对值
    if (num <= n) {
      nums[num - 1] = -Math.abs(nums[num - 1]); // 给对应的位置上的数加负号，表示已经存在
    }
  }

  for (let i = 0; i < n; i++) {
    if (nums[i] > 0) {
      return i + 1;
    }
  }

  return n + 1;
}