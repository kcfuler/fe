/**
 * @param {number[][]} matrix
 * @param {number} target
 * @return {boolean}
 */
var findNumberIn2DArray = function (matrix, target) {
  if (!matrix.length || !matrix[0].length) {
    return false;
  }

  let m = matrix.length;
  let i = matrix[0].length - 1;

  let j = 0;
  while (i >= 0 && j < m) {
    if (matrix[i][j] === target) {
      return true;
    }
    if (matrix[i][j] > target) {
      i--;
    } else {
      j++;
    }
  }

  return false;
};

console.log(findNumberIn2DArray([[1, 1]], 0));
