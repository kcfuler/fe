function exist(board: string[][], word: string): boolean {
    const rows = board.length;
    const cols = board[0].length;

    const dirs = [[0, 1], [0, -1], [1, 0], [-1, 0]];
    const dfs = (index: number, x: number, y: number) => {
        // 找到答案
        if (index === word.length) {
            return true;
        }

        if (x < 0 || x >= rows || y < 0 || y >= cols || board[x][y] !== word[index]) {
            return false;
        }

        // 避免重复
        const temp = board[x][y];
        board[x][y] = '*';
        // 构造答案
        for (const [dx, dy] of dirs) {
            const nx = dx + x;
            const ny = dy + y;

            if (dfs(index + 1, nx, ny)) {
                return true;
            }
        }

        // 重置状态
        board[x][y] = temp;
        return false;

    }

    for (let i = 0; i < rows; i++) {
        for (let j = 0; j < cols; j++) {
            if (dfs(0, i, j)) {
                return true;
            }
        }
    }

    return false;
}