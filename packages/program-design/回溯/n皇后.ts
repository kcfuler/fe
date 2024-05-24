
/*
* 通过 row => col + 回溯的方式遍历所有状态
* 判断的核心在于通过 cols + diag1 + diag2 三个数组来标识是否符合条件
* */
function solveNQueens(n: number): string[][] {
    const result: string[][] = [];
    const board: string[][] = new Array(n).fill(null).map(() => new Array(n).fill('.'))
    // 列、两个方向的对角线占用情况
    const cols = new Set<number>();
    const diag1 = new Set<number>();
    const diag2 = new Set<number>();

    const createBoard = () => {
        return board.map(row => row.join());
    }

    const placeQueens = (row: number) => {
        // 答案
        if (row === n) {
            result.push(createBoard());
            return;
        }

        // 对每一行遍历
        for (let col = 0; col < n; col++) {
            const d1 = row - col;
            const d2 = row + col;

            if (cols.has(col) || diag1.has(d1) || diag2.has(d2)) continue;

            board[row][col] = 'Q';
            cols.add(col);
            diag1.add(d1);
            diag2.add(d2);

            // 递归到下一行
            placeQueens(row + 1);

            board[row][col] = '.';
            cols.delete(col);
            diag1.delete(d1);
            diag2.delete(d2);
        }
    }

    placeQueens(0);

    return result;
}