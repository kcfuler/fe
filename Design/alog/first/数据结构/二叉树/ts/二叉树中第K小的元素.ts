import type { TreeNode } from './types'

function kthSmallest(root: TreeNode | null, k: number): number {
  let cnt = 0;
  let result = 0;

  const dfs = (node: TreeNode | null): void => {
    if (node === null) {
      return;
    }

    dfs(node.left);

    cnt++;
    if (cnt === k) {
      result = node.val;
      return;
    }

    dfs(node.right);
  }

  dfs(root);

  return result;
};