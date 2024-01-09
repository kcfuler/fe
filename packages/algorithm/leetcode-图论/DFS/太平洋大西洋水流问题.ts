function pacificAtlantic(heights: number[][]): number[][] {
  const rows = heights.length;
  const cols = heights[0].length;
  const dirs = [[0, 1], [0, -1], [1, 0], [-1, 0]];
  const pacific = Array.from({length: rows}, () => Array.from({length: cols}, () => false));
  const atlantic = Array.from({length: rows}, () => Array.from({length: cols}, () => false));

  const dfs = (x: number, y: number, visited: boolean[][]) => {
    visited[x][y] = true;

    for (const [dx, dy] of dirs) {
      const newX = x + dx;
      const newY = y + dy;

      if (newX < 0 || newX >= rows || newY < 0 || newY >= cols || visited[newX][newY] || heights[newX][newY] < heights[x][y]) {
        continue;
      }

      dfs(newX, newY, visited);
    }

  }

  // 从上下边界开始搜索
  for (let i = 0; i < rows; i++) {
    dfs(i, 0, pacific);
    dfs(i, cols - 1, atlantic);
  }
  // 从左右边界开始搜索
  for (let i = 0; i < cols; i++) {
    dfs(0, i, pacific);
    dfs(rows - 1, i, atlantic);
  }

  const result: number[][] = [];
  for (let i = 0; i < rows; i++) {
    for (let j = 0; j < cols; j++) {
      if (pacific[i][j] && atlantic[i][j]) {
        result.push([i, j]);
      }
    }
  }

  return result;
}