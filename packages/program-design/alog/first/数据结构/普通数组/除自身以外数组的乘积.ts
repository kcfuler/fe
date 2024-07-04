// 先构建左边数组的乘积，再构建右边数组的乘积
// 最后的答案就是左右相乘
function productExceptSelf(nums: number[]): number[] {
  const ans: number[] = new Array(nums.length)

  ans[0] = 1;
  for (let i = 1; i < nums.length; i++) {
    ans[i] = ans[i - 1] * nums[i - 1];
  }

  let R = 1;
  for (let i = nums.length - 1; i >= 0; i--) {
    ans[i] *= R;
    R *= nums[i];
  }

  return ans;
};