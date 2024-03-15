function closedIsland(grid: number[][]): number {
  const rows = grid.length;
  const cols = grid[0].length;
  const dirs = [[0, 1], [0, -1], [1, 0], [-1, 0]];
  const dfs = (x: number, y: number) => {
    if (x < 0 || x >= rows || y < 0 || y >= cols || grid[x][y] === 1) {
      return;
    }

    grid[x][y] = 1;

    for (const [dx, dy] of dirs) {
      dfs(x + dx, y + dy);
    }
  }


  for (let i = 0; i < rows; i++) {
    dfs(i, 0);
    dfs(i, cols - 1);
  }

  for (let j = 0; j < cols; j++) {
    dfs(0, j);
    dfs(rows - 1, j);
  }

  let closedIslands = 0;
  for (let i = 0; i < rows; i++) {
    for (let j = 0; j < cols; j++) {
      if (grid[i][j] === 0) {
        closedIslands++;
        dfs(i, j);
      }
    }
  }

  return closedIslands;
}

console.assert(closedIsland([[0, 0, 0, 0], [1, 0, 1, 0], [0, 1, 1, 0], [0, 0, 0, 0]]) === 2);