function searchRange(nums: number[], target: number): number[] {
  const ans = new Array(2).fill(-1);

  // 找上界
  let l = 0,
    r = nums.length - 1;
  while (l < r) {
    const mid = Math.floor((l + r + 1) / 2);
    if (nums[mid] <= target) {
      l = mid;
    } else {
      r = mid - 1;
    }
  }
  if (nums[l] === target) ans[0] = l;

  // 找下界
  l = 0;
  r = nums.length - 1;
  while (l < r) {
    const mid = Math.floor((l + r) / 2);
    if (nums[mid] >= target) {
      r = mid;
    } else {
      l = mid + 1;
    }
  }

  if (nums[l] === target) ans[1] = l;

  return ans;
}
