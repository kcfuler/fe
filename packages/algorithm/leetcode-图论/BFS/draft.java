import java.util.*;

public class draft {
  public int[][] updateMatrix(int[][] mat) {
    if (mat == null || mat.length == 0 || mat[0].length == 0) {
      return mat;
    }

    int rows = mat.length;
    int cols = mat[0].length;
    int[][] dist = new int[rows][cols];
    Queue<int[]> queue = new LinkedList<>();

    for (int i = 0; i < rows; i++) {
      for (int j = 0; j < cols; j++) {
        if (mat[i][j] == 0) {
          dist[i][j] = 0;
          queue.offer(new int[] { i, j });
        } else {
          dist[i][j] = rows + cols;
        }
      }
    }

    int[][] dirs = new int[][] { { -1, 0 }, { 1, 0 }, { 0, -1 }, { 0, 1 } };
    while (!queue.isEmpty()) {
      int[] position = queue.poll();
      int x = position[0];
      int y = position[1];

      for (int[] dir : dirs) {
        int nx = x + dir[0];
        int ny = y + dir[1];

        if (nx >= 0 && ny >= 0 && nx < rows && ny < cols) {
          if (dist[nx][ny] > dist[x][y] + 1) {
            dist[nx][ny] = dist[x][y] + 1;
            queue.offer(new int[] { nx, ny });
          }
        }
      }
    }

    return dist;
  }
}
