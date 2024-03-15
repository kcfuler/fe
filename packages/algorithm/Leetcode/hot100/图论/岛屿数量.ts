// dfs即可，注意边界判断
function numIslands(grid: string[][]): number {
    const dirs = [[0, 1], [1, 0], [-1, 0], [0, -1]];
    const rows = grid.length;
    const cols = grid[0].length;
    const dfs = (x: number, y: number) => {
        if (grid[x][y] === '1') {
            grid[x][y] = '0';
            for (const [dx, dy] of dirs) {
                const nx = dx + x;
                const ny = dy + y;
                if (nx < 0 || nx >= rows || ny < 0 || ny >= cols) continue

                dfs(nx, ny);
            }
        }
    }

    let ans = 0;
    for (let i = 0; i < rows; i++) {
        for (let j = 0; j < cols; j++) {
            if (grid[i][j] === '1') {
                dfs(i, j);
                ans++;
            }
        }
    }

    return ans;
}