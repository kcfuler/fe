import java.util.*;

public class draft {
  public class TreeNode {
    int val;
    TreeNode left;
    TreeNode right;

    TreeNode(int x) {
      val = x;
    }
  }

  Map<TreeNode, TreeNode> parentsMap = new HashMap<>();

  public List<Integer> distanceK(TreeNode root, TreeNode target, int k) {
    createParentMap(root, null);

    Queue<TreeNode> que = new LinkedList<>();
    Set<TreeNode> visited = new HashSet<>();

    que.offer(target);
    visited.add(target);

    int depth = 0;
    while (!que.isEmpty()) {
      // 返回结果
      if (depth == k) {
        List<Integer> res = new ArrayList<>();
        for (TreeNode node : que) {
          res.add(node.val);
        }
        return res;
      }

      int size = que.size();
      while (size-- > 0) {
        TreeNode curNode = que.poll();

        if (curNode.left != null && visited.add(curNode.left)) {
          que.offer(curNode.left);
        }
        if (curNode.right != null && visited.add(curNode.right)) {
          que.offer(curNode.right);
        }

        TreeNode parentNode = parentsMap.get(curNode);
        if (parentNode != null && visited.add(parentNode)) {
          que.offer(parentNode);
        }
      }
      depth++;
    }

    return new ArrayList<>();
  }

  public void createParentMap(TreeNode node, TreeNode parent) {
    if (node != null) {
      parentsMap.put(node, parent);
      createParentMap(node.left, node);
      createParentMap(node.right, node);
    }
  }
}
