import type { TreeNode } from './types'

function inorderTraversal(root: TreeNode | null): number[] {
  const result: number[] = [];

  const dfs = (node: TreeNode | null) => {
    if (node === null) {
      return;
    }
    dfs(node.left);
    result.push(node.val)
    dfs(node.right)
  }

  dfs(root);

  return result;
};