/**
 * @param {number[]} nums
 * @return {number[][]}
 */
var threeSum = function (nums) {
  const ans = [];
  nums.sort((a, b) => a - b);

  for (let i = 0; i < nums.length; i++) {
    if (i > 0 && nums[i] === nums[i - 1]) continue;

    let left = i + 1,
      right = nums.length - 1;
    while (left < right) {
      let sum = nums[left] + nums[i] + nums[right];

      if (sum === 0) {
        ans.push([nums[left], nums[i], nums[right]]);

        while (left < right && nums[left + 1] === nums[left]) left++;
        while (left < right && nums[right - 1] === nums[right]) right--;

        left++, right--;
      } else if (sum > 0) {
        right--;
      } else {
        left++;
      }
    }
  }

  return ans;
};
