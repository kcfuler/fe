public class Solution {
    public int numIslands(char[][] grid) {
        if (grid == null || grid.length == 0)
            return 0;

        int islandCount = 0;

        for (int row = 0; row < grid.length; row++) {
            for (int col = 0; col < grid[row].length; col++) {
                if (grid[row][col] == '1') {
                    // If land is found, increment the islandCount and sink the connected land.
                    islandCount++;
                    dfs(grid, row, col);
                }
            }
        }

        return islandCount;
    }

    private void dfs(char[][] grid, int row, int col) {
        // Ensure current cell is within grid and a land.
        if (row < 0 || row >= grid.length || col < 0  || col >= grid[row].length || grid[row][col] != '1')
            return;

        // Sink the land
        grid[row][col] = '0';

        // Sink the surrounding land
        dfs(grid, row, col + 1);
        dfs(grid, row, col - 1);
        dfs(grid, row + 1, col);
        dfs(grid, row - 1, col);
    }
}