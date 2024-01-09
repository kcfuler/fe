import java.util.*;

public class Solution {
  public int ladderLength(String beginWord, String endWord, List<String> wordList) {
    Set<String> wordSet = new HashSet<>(wordList);
    if (!wordSet.contains(endWord))
      return 0;

    Queue<String> queue = new LinkedList<>();
    queue.offer(beginWord);
    int level = 1;

    while (!queue.isEmpty()) {
      int size = queue.size();
      for (int i = 0; i < size; i++) {
        String currentWord = queue.poll();
        if (currentWord.equals(endWord))
          return level;
        for (String neighbor : getNeighbors(currentWord, wordSet)) {
          queue.offer(neighbor);
        }
      }
      level++;
    }
    return 0;
  }

  private List<String> getNeighbors(String word, Set<String> wordSet) {
    List<String> neighbors = new ArrayList<>();
    char[] chars = word.toCharArray();

    for (int i = 0; i < chars.length; i++) {
      char oldChar = chars[i];
      for (char c = 'a'; c <= 'z'; c++) {
        if (c == oldChar)
          continue;
        chars[i] = c;
        String newWord = new String(chars);
        if (wordSet.remove(newWord)) {
          neighbors.add(newWord);
        }
      }
      chars[i] = oldChar;
    }
    return neighbors;
  }
}