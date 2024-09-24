// 使用单调栈可以解决
// 应该存储索引，用于判断该移除哪一个值
function maxSlidingWindow(nums: number[], k: number): number[] {
  const ans: number[] = [];
  const stk: number[] = [];

  for (let i = 0; i < nums.length; i++) {

    while (stk.length && nums[stk[stk.length - 1]] <= nums[i]) {
      stk.pop();
    }

    stk.push(i);

    if (stk[0] <= i - k) {
      stk.shift();
    }

    if (i >= k - 1) {
      ans.push(nums[stk[0]]);
    }
  }

  return ans;
};

console.log(maxSlidingWindow([1, 3, -1, -3, 5, 3, 6, 7], 3));
