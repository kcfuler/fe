function generate(numRows: number): number[][] {
    const res: number[][] = [];
    if (numRows <= 0) {
        return res;
    }

    // 通过杨辉三角的性质逐行生成
    for (let row = 0; row < numRows; row++) {
        res[row] = [];
        res[row][0] = 1;

        for (let col = 1; col < row; col++) {
            res[row][col] = res[row - 1][col - 1] + res[row - 1][col];
        }

        res[row][row] = 1;
    }

    return res;
}