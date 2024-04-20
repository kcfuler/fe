/*
* 由矩阵的性质，可以先找到在哪一行，再在那一行里寻找在哪一列
* */
function searchMatrix(matrix: number[][], target: number): boolean {
    const rows = matrix.length;
    const cols = matrix[0].length;

    let selectedRow = -1;
    for (let i = 0; i < rows; i++) {
        if (matrix[i][cols - 1] >= target) {
            selectedRow = i;
            break;
        }
    }

    if (selectedRow === -1) {
        return false;
    }

    let left = 0, right = cols - 1;
    while (left <= right) {
        let mid = Math.floor((right + left) / 2);

        if (matrix[selectedRow][mid] === target) {
            return true;
        } else if (matrix[selectedRow][mid] < target) {
            left = mid + 1;
        } else {
            right = mid - 1;
        }
    }

    return false;
}