function searchMatrix(matrix: number[][], target: number): boolean {
  if (!matrix || matrix.length === 0 || matrix[0].length === 0) {
    return false;
  }

  const m = matrix.length;
  const n = matrix[0].length;

  // 第一次二分：查找可能的行
  let top = 0;
  let bottom = m - 1;
  while (top < bottom) {
    const mid = Math.floor((top + bottom + 1) / 2);
    if (matrix[mid][0] <= target) {
      top = mid;
    } else {
      bottom = mid - 1;
    }
  }

  // 目标行
  const row = top;

  // 第二次二分：在目标行中查找
  let left = 0;
  let right = n - 1;
  while (left <= right) {
    const mid = Math.floor((left + right) / 2);
    if (matrix[row][mid] === target) {
      return true;
    } else if (matrix[row][mid] < target) {
      left = mid + 1;
    } else {
      right = mid - 1;
    }
  }

  return false;
}

// 通过矩阵的性质来做
function searchMatrix1(matrix: number[][], target: number): boolean {
  const n = matrix.length;
  const m = matrix[0].length;
  let rStart = 0,
    rEnd = n - 1;
  let cStart = 0,
    cEnd = m - 1;
  while (rStart <= rEnd && cStart <= cEnd) {
    const x = matrix[rStart][cEnd];
    if (x == target) {
      return true;
    } else if (x < target) {
      rStart++;
    } else {
      cEnd--;
    }
  }
  return false;
}
