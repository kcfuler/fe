import java.util.*;

public class draft {
  public int ladderLength(String beginWord, String endWord, List<String> wordList) {
    Set<String> wordSet = new HashSet<>(wordList);
    if (!wordSet.contains(endWord))
      return 0;

    Queue<String> queue = new LinkedList<>();
    queue.offer(beginWord);
    int level = 1;

    while (!queue.isEmpty()) {
      int size = queue.size();
      while (size-- > 0) {
        String current = queue.poll();
        if (current.equals(endWord)) {
          return level;
        }
        char[] currentArray = current.toCharArray();
        for (int i = 0; i < currentArray.length; i++) {
          char old = currentArray[i];
          for (char c = 'a'; c <= 'z'; c++) {
            if (c == old) {
              continue;
            }
            currentArray[i] = c;
            String next = new String(currentArray);
            // remove是用来替代visited，起到判断哪些单词出现过的功能
            if (wordSet.remove(next)) {
              queue.offer(next);
            }
          }
          currentArray[i] = old;
        }
      }
      level++;
    }

    return 0;
  }
}
