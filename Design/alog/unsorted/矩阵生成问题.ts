/**
 * @param {number} n
 * @return {number[][]}
 */
function generateMatrix(n: number) {
    // 初始化 n x n 的矩阵，填充为 0
    const matrix = Array(n).fill(0).map(() => Array(n).fill(0));

    let num = 1; // 开始填充的数字
    let left = 0, right = n - 1, top = 0, bottom = n - 1;

    while (num <= n * n) {
        // 从左到右
        for (let i = left; i <= right; i++) {
            matrix[top][i] = num++;
        }
        top++;

        // 从上到下
        for (let i = top; i <= bottom; i++) {
            matrix[i][right] = num++;
        }
        right--;

        // 从右到左
        for (let i = right; i >= left; i--) {
            matrix[bottom][i] = num++;
        }
        bottom--;

        // 从下到上
        for (let i = bottom; i >= top; i--) {
            matrix[i][left] = num++;
        }
        left++;
    }

    return matrix;
}