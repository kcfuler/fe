import type { TreeNode } from './types'

function invertTree(root: TreeNode | null): TreeNode | null {
  const dfs = (node: TreeNode | null): TreeNode | null => {
    if (!node) {
      return null
    }

    dfs(node.left);
    dfs(node.right);
    const temp = node.left;
    node.left = node.right;
    node.right = temp;

    return node
  }

  return dfs(root);
};