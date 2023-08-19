/**
 * @param {number[]} array
 * @return {void}
 */
var reOrderArray = function (array) {
  let ans = []
  for (n of array) {
    if (n % 2 == 0) {
      ans.push(n)
    }
    else {
      ans.unshift(n)
    }
    console.log(ans)
  }
  return ans
};

console.log(reOrderArray([1, 2, 3, 4, 5]));