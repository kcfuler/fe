function maxAreaOfIsland(grid: number[][]): number {
  const dirs = [[0, 1], [0, -1], [1, 0], [-1, 0]];
  const rows = grid.length;
  const cols = grid[0].length;

  const dfs = (x: number, y: number) => {
    // 边界
    if (x < 0 || x >= rows || y < 0 || y >= cols || grid[x][y] === 0) {
      return 0;
    }

    grid[x][y] = 0;
    let area = 1; // 求每一个岛的面积

    for (const [dx, dy] of dirs) {
      area += dfs(x + dx, y + dy);
    }

    return area;
  }

  let ans = 0;
  for (let i = 0; i < rows; i++) {
    for (let j = 0; j < cols; j++) {
      if (grid[i][j] === 1) {
        ans = Math.max(ans, dfs(i, j));
      }
    }
  }

  return ans;
}