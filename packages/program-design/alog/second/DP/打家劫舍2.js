/**
 * @param {number[]} nums
 * @return {number}
 */
var rob = function (nums) {
  if (nums.length === 0) {
    return 0;
  }
  if (nums.length === 1) return nums[0];

  const doRob = (houses) => {
    let prev = 0;
    let curr = 0;
    for (let i = 0; i < houses.length; i++) {
      let temp = curr;
      curr = Math.max(prev + houses[i], curr);
      prev = temp;
    }

    return curr;
  };

  return Math.max(doRob(nums.slice(1)), doRob(nums.slice(0, -1)));
};
