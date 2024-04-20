import java.util.*;

public class Solution {
  private static final int[][] DIRS = { { 0, 1 }, { 1, 0 }, { 1, 1 }, { -1, -1 }, { -1, 0 }, { -1, 1 }, { 0, -1 },
      { 1, -1 } };

  public int shortestPathBinaryMatrix(int[][] grid) {
    int n = grid.length;
    if (grid[0][0] == 1 || grid[n - 1][n - 1] == 1) {
      return -1;
    }
    Queue<int[]> queue = new LinkedList<>();
    queue.offer(new int[] { 0, 0 });
    grid[0][0] = 1;
    int steps = 1;
    while (!queue.isEmpty()) {
      int size = queue.size();
      while (size-- > 0) {
        int[] cur = queue.poll();
        if (cur[0] == n - 1 && cur[1] == n - 1) {
          return steps;
        }
        for (int[] dir : DIRS) {
          int x = cur[0] + dir[0];
          int y = cur[1] + dir[1];
          if (x >= 0 && x < n && y >= 0 && y < n && grid[x][y] == 0) {
            queue.offer(new int[] { x, y });
            grid[x][y] = 1;
          }
        }
      }
      steps++;
    }
    return -1;
  }
}