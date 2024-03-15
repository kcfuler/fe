// 排序 + 双指针
// 遍历 + 避免重复
function threeSum(nums: number[]): number[][] {
  nums.sort((a, b) => a - b);
  const result: number[][] = [];

  for (let i = 0; i < nums.length - 2; i++) {
    if (nums[i] > 0) break;
    if (i > 0 && nums[i] === nums[i - 1]) continue;

    let left = i + 1;
    let right = nums.length - 1;

    while (left < right) {
      let sum = nums[i] + nums[left] + nums[right];

      if (sum === 0) {
        result.push([nums[i], nums[left], nums[right]]);

        while (left < right && nums[left + 1] === nums[left]) left++;
        while (left < right && nums[right - 1] === nums[right]) right++;

        left++;
        right--;
      } else if (sum > 0) {
        right--;
      } else {
        left++;
      }
    }

  }

  return result;
}