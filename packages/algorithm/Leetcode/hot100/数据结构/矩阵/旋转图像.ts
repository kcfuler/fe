/**
 Do not return anything, modify matrix in-place instead.
 */
// 先转置矩阵，再翻转每一行
function rotate(matrix: number[][]): void {
    const length = matrix.length;
    // 1. 按对角线转置矩阵
    for (let i = 0; i < length; i++) {
        for (let j = i + 1; j < length; j++) {
            [matrix[i][j], matrix[j][i]] = [matrix[j][i], matrix[i][j]];
        }
    }

    for (let i = 0; i < length; i++) {
        matrix[i].reverse();
    }
}