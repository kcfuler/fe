function numEnclaves(grid: number[][]): number {
  const rows = grid.length;
  const cols = grid[0].length;

  const dirs = [[0, 1], [0, -1], [1, 0], [-1, 0]];
  const visited = new Array(rows).fill(0).map(() => new Array(cols).fill(false));
  let res = 0;

  const dfs = (x: number, y: number) => {
    if (x < 0 || x >= rows || y < 0 || y >= cols || grid[x][y] === 0) {
      return;
    }

    grid[x][y] = 0;

    for (const [dx, dy] of dirs) {
      dfs(x + dx, y + dy);
    }
  }

  for (let i = 0; i < rows; i++) {
    dfs(i, 0);
    dfs(i, rows - 1);
  }

  for (let j = 0; j < cols; j++) {
    dfs(0, j);
    dfs(rows - 1, j);
  }

  for (let i = 0; i < rows; i++) {
    for (let j = 0; j < cols; j++) {
      if (grid[i][j] === 1) {
        res++;
      }
    }
  }

  return res;
}

console.assert(numEnclaves([[0, 0, 0, 0], [1, 0, 1, 0], [0, 1, 1, 0], [0, 0, 0, 0]]) === 3);
