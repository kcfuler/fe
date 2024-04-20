import java.util.*;

public class Solution {
  public int[][] updateMatrix(int[][] mat) {
    if (mat == null || mat.length == 0 || mat[0].length == 0) {
      return mat;
    }

    int rows = mat.length;
    int cols = mat[0].length;
    int[][] dist = new int[rows][cols];
    Queue<int[]> queue = new LinkedList<>();

    // 初始化距离矩阵和队列
    for (int i = 0; i < rows; i++) {
      for (int j = 0; j < cols; j++) {
        if (mat[i][j] == 0) {
          dist[i][j] = 0;
          queue.offer(new int[] { i, j }); // 将0的位置加入队列
        } else {
          dist[i][j] = rows + cols; // 设置一个较大的初始值
        }
      }
    }

    // 方向数组，用于查找上下左右四个邻居
    int[][] dirs = { { -1, 0 }, { 1, 0 }, { 0, -1 }, { 0, 1 } };

    // 广度优先搜索
    while (!queue.isEmpty()) {
      int[] cell = queue.poll();
      for (int[] dir : dirs) {
        int newRow = cell[0] + dir[0];
        int newCol = cell[1] + dir[1];
        if (newRow >= 0 && newRow < rows && newCol >= 0 && newCol < cols) {
          if (dist[newRow][newCol] > dist[cell[0]][cell[1]] + 1) {
            dist[newRow][newCol] = dist[cell[0]][cell[1]] + 1;
            queue.offer(new int[] { newRow, newCol });
          }
        }
      }
    }

    return dist;
  }

}