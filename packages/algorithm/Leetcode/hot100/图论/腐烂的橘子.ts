/*
* 使用预处理来实现多源 BFS
* 使用flag来判断是否有腐烂的橘子
* */
function orangesRotting(grid: number[][]): number {
    let ans = 0;
    const rows = grid.length, cols = grid[0].length;
    const dirs = [[0, 1], [1, 0], [-1, 0], [0, -1]];
    let freshOranges = 0;
    let time = 0;
    let queue: [number, number][] = [];

    for (let i = 0; i < rows; i++) {
        for (let j = 0; j < cols; j++) {
            if (grid[i][j] === 2) {
                queue.push([i, j]);
            } else if (grid[i][j] === 1) {
                freshOranges++;
            }
        }
    }

    if (freshOranges === 0) return 0;

    while (queue.length > 0) {
        let queLen = queue.length;
        let flag = false;

        for (let i = 0; i < queLen; i++) {
            let [x, y] = queue.shift()!;
            for (const [dx, dy] of dirs) {
                const nx = x + dx;
                const ny = y + dy;

                if (nx >= 0 && nx < rows && ny >= 0 && ny < cols && grid[nx][ny] === 1) {
                    grid[nx][ny] = 2;
                    queue.push([nx, ny]);
                    freshOranges--;
                    flag = true;
                }
            }
        }
        if (flag) time++;
    }


    return freshOranges === 0 ? time : -1;
}