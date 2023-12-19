import java.util.*;

public class Solution {
  public int minMutation(String startGene, String endGene, String[] bank) {
    Set<String> bankSet = new HashSet<>(Arrays.asList(bank));
    if (!bankSet.contains(endGene))
      return -1;

    char[] charSet = new char[] { 'A', 'C', 'G', 'T' };
    Queue<String> queue = new LinkedList<>();
    Set<String> visited = new HashSet<>();

    queue.offer(startGene);
    visited.add(startGene);
    int level = 0;

    while (!queue.isEmpty()) {
      int size = queue.size();
      while (size-- > 0) {
        String current = queue.poll();
        if (current.equals(endGene))
          return level;
        char[] currentArray = current.toCharArray();
        for (int i = 0; i < currentArray.length; i++) {
          char old = currentArray[i];
          for (char c : charSet) {
            currentArray[i] = c;
            String next = new String(currentArray);
            if (!visited.contains(next) && bankSet.contains(next)) {
              visited.add(next);
              queue.offer(next);
            }
          }
          currentArray[i] = old;
        }
      }
      level++;
    }
    return -1;
  }
}
