/**
 * @param {number[]} nums
 * @param {number} k
 * @return {number}
 */
var longestEqualSubarray = function (nums, k) {
  const n = nums.length;
  // 构造一个相同元素的下标数组
  let pos = Array.form({ length: n + 1 }, () => []);
  nums.forEach((x, i) => {
    pos[x].push(i);
  });

  let ans = 0;

  // 滑动窗口
  for (const ps of pos) {
    let left = 0;
    for (let right = 0; right < ps.length; right++) {
      const p = ps[right];
      while (p - ps[left] + 1 - (right - left + 1) > k) {
        left++;
      }
      ans = Math.max(ans, right - left + 1);
    }
  }

  return ans;
};
