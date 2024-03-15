import { TreeNode } from "./types";

function levelOrder(root: TreeNode | null): number[][] {
  if (root === null) {
    return [];
  }
  const res: number[][] = [];
  const q: TreeNode[] = [root];

  while (q.length) {
    const level: number[] = []
    const len = q.length; // 避免length的动态变化
    for (let i = 0; i < len; i++) {
      const top = q.shift()!;
      level.push(top.val);

      if (top.left) q.push(top.left);
      if (top.right) q.push(top.right);
    }
    res.push([...level])
  }

  return res;
};