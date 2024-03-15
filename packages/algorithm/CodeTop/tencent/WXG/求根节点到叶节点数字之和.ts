import { TreeNode } from "../../../Leetcode/hot100/数据结构/二叉树/types";

function sumNumbers(root: TreeNode | null): number {
  let totalSum = 0;
  const dfs = (node: TreeNode | null, cnt: number) => {
    if (node === null) {
      return;
    }

    cnt = node.val + cnt * 10;
    // 叶子节点，累加和
    if (node.left === null && node.right === null) {
      totalSum += cnt;
      return;
    }

    if (node.left) dfs(node.left, cnt);
    if (node.right) dfs(node.right, cnt);
  }

  dfs(root, 0);

  return totalSum;
};