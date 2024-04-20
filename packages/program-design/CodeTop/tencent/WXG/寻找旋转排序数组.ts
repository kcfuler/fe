/* 
思路：
1. 总体使用二分查找
2. 因为有可能存在相同元素，当 nums[mid] === nums[right] 时，可以排除右边的值
   也就是 right--;
*/
function findMin(nums: number[]): number {
  let left = 0, right = nums.length - 1;

  while (left < right) {
    const mid = left + Math.floor((right - left) / 2);

    if (nums[mid] < nums[right]) {
      right = mid;
    } else if (nums[mid] > nums[right]) {
      left = mid + 1;
    } else {
      // 处理重复元素：等于的时候减，但小于的时候不减
      right--;
    }
  }

  return nums[left];
}