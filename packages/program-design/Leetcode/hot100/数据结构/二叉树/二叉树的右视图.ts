import type { TreeNode } from "./types";

// 可以用层次遍历 + 取每一层最右边
function rightSideView(root: TreeNode | null): number[] {
  if (root === null) {
    return []
  }

  const res: number[] = [];
  const q: TreeNode[] = [root];
  while (q.length) {
    const len = q.length;

    let lastVal = 0;
    for (let i = 0; i < len; i++) {
      const top = q.shift()!;

      lastVal = top.val;

      if (top.left) q.push(top.left);
      if (top.right) q.push(top.right);
    }

    res.push(lastVal);
  }

  return res;
};