package 二叉树中所有距离为k的节点;

import java.util.*;

public class Solution {
  // 存储每个节点的父节点
  Map<TreeNode, TreeNode> parentMap = new HashMap<>();

  public List<Integer> distanceK(TreeNode root, TreeNode target, int k) {
    // 建立每个节点的父节点引用
    createParentMap(root, null);

    // BFS 从目标节点开始搜索距离为 k 的节点
    Queue<TreeNode> queue = new LinkedList<>();
    Set<TreeNode> visited = new HashSet<>();
    queue.add(target);
    visited.add(target);

    int currentDistance = 0;
    while (!queue.isEmpty()) {
      if (currentDistance == k) {
        List<Integer> result = new ArrayList<>();
        for (TreeNode node : queue) {
          result.add(node.val);
        }
        return result;
      }
      int levelSize = queue.size();
      for (int i = 0; i < levelSize; i++) {
        TreeNode currentNode = queue.poll();
        // 检查子节点
        if (currentNode.left != null && visited.add(currentNode.left)) {
          queue.add(currentNode.left);
        }
        if (currentNode.right != null && visited.add(currentNode.right)) {
          queue.add(currentNode.right);
        }
        // 检查父节点
        TreeNode parentNode = parentMap.get(currentNode);
        if (parentNode != null && visited.add(parentNode)) {
          queue.add(parentNode);
        }
      }
      currentDistance++;
    }

    return new ArrayList<>();
  }

  private void createParentMap(TreeNode node, TreeNode parent) {
    if (node != null) {
      parentMap.put(node, parent);
      createParentMap(node.left, node);
      createParentMap(node.right, node);
    }
  }
}
