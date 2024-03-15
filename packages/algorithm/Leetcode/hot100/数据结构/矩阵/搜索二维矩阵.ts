// 使用双指针
function searchMatrix(matrix: number[][], target: number): boolean {
    const rows = matrix.length;
    const cols = matrix[0].length;

    let ans = false;
    let i = 0, j = cols - 1;
    while (i < rows && j >= 0) {
        if (matrix[i][j] === target) {
            ans = true;
            break;
        }
        if (matrix[i][j] > target) {
            j--;
        } else {
            i++;
        }
    }

    return ans;
};