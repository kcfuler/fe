// 使用双指针维护遍历位置
function spiralOrder(matrix: number[][]): number[] {
  const result: number[] = [];
  const rows = matrix.length;
  const cols = matrix[0].length;

  let left = 0, right = cols - 1, top = 0, bottom = rows - 1;
  while (left <= right && top <= bottom) {

    // left -> right
    for (let col = left; col <= right; col++) {
      result.push(matrix[top][col]);
    }
    top++;

    // top -> bottom
    for (let row = top; row <= bottom; row++) {
      result.push(matrix[row][right]);
    }
    right--;

    // right -> left
    // 注意判断是否越界
    if (top <= bottom) {
      for (let col = right; col >= left; col--) {
        result.push(matrix[bottom][col]);
      }
      bottom--;
    }

    // bottom -> top
    // 注意判断是否越界
    if (left <= right) {
      for (let row = bottom; row >= top; row--) {
        result.push(matrix[row][left]);
      }
      left++;
    }
  }


  return result
};