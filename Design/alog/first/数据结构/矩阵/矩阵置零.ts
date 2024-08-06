// 不能使用额外的空间
// 使用第一行和第一列来记录是否需要置零
// 但是需要注意的是，第一行和第一列本身也需要置零，使用两个变量来记录即可
// 注意遍历的时候不要包括第一行
function setZeroes(matrix: number[][]): void {
    const rows = matrix.length;
    const cols = matrix[0].length;
    let firstRowZero = false;
    let firstColZero = false;

    // 检查第一列
    for (let i = 0; i < rows; i++){
        if (matrix[i][0] === 0) {
            firstColZero = true;
            break;
        }
    }

    // 检查第一行
    for (let i = 0; i < cols; i++){
        if (matrix[0][i] === 0) {
            firstRowZero = true;
            break;
        }
    }

    // 使用第一行和第一列记录
    for (let i = 1; i < rows; i++) {
        for (let j = 1; j < cols; j++) {
            if (matrix[i][j] === 0) {
                matrix[i][0] = 0; // 行
                matrix[0][j] = 0; // 列
            }
        }
    }

    // 置零
    for (let i = 1; i < rows; i++) {
        for (let j = 1; j < cols; j++) {
            if (matrix[i][0] === 0 || matrix[0][j] === 0) {
                matrix[i][j] = 0;
            }
        }
    }
    // 处理第一行、第一列
    if (firstColZero) {
        for(let i = 0; i < rows; i++) {
            matrix[i][0] = 0;
        }
    }
    if (firstRowZero) {
        for (let i = 0; i < cols; i++) {
            matrix[0][i] = 0;
        }
    }
}