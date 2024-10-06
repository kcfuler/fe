/*
1. 返回任意峰值
2. 峰值左右元素小于峰值元素
*/
function findPeakElement(nums: number[]): number {
  let left = -1;
  let right = nums.length - 1;

  while (left + 1 < right) {
    const mid = Math.floor((left + right) / 2);

    if (nums[mid] < nums[mid + 1]) {
      left = mid;
    } else {
      right = mid;
    }
  }

  return right;
}

// 闭区间版本
function findPeakElement_1(nums: number[]): number {
  let left = 0;
  let right = nums.length - 2;

  while (left <= right) {
    const mid = Math.floor((left + right) / 2);

    if (nums[mid] < nums[mid + 1]) {
      left = mid + 1;
    } else {
      right = mid - 1;
    }
  }

  return left;
}
