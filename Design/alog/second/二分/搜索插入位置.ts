// 这种写法
function searchInsert(nums: number[], target: number): number {
  let left = 0,
    right = nums.length; // 因为插入之后，数组长度+1，所以这里不需要-1

  while (left < right) {
    let mid = Math.floor((left + right) / 2);
    if (nums[mid] >= target) {
      right = mid;
    } else {
      left = mid + 1;
    }
  }

  return left;
}
