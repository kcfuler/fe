/**
 * @param {number[][]} grid
 * @return {number}
 */
var orangesRotting = function (grid) {
  const m = grid.length;
  const n = grid[0].length;
  const queue = [];
  let freshOranges = 0;

  // 遍历网格，记录腐烂橘子和新鲜橘子
  for (let i = 0; i < m; i++) {
    for (let j = 0; j < n; j++) {
      if (grid[i][j] === 2) {
        queue.push([i, j, 0]); // [行, 列, 时间]
      } else if (grid[i][j] === 1) {
        freshOranges++;
      }
    }
  }

  const directions = [
    [1, 0],
    [-1, 0],
    [0, 1],
    [0, -1],
  ]; // 四个方向
  let maxTime = 0;

  // BFS
  while (queue.length > 0 && freshOranges > 0) {
    const [x, y, time] = queue.shift();
    maxTime = Math.max(maxTime, time);

    for (const [dx, dy] of directions) {
      const newX = x + dx;
      const newY = y + dy;

      if (
        newX >= 0 &&
        newX < m &&
        newY >= 0 &&
        newY < n &&
        grid[newX][newY] === 1
      ) {
        grid[newX][newY] = 2; // 腐烂新鲜橘子
        freshOranges--;
        queue.push([newX, newY, time + 1]);
      }
    }
  }

  return freshOranges === 0 ? maxTime : -1;
};
