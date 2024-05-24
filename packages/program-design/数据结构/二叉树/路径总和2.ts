import type { TreeNode } from './types'

/* 
将逻辑分成两部分：
1. 递归每一个点
2. 对每一个点统计数量
*/

function pathSum(root: TreeNode | null, targetSum: number): number {
  if (root === null) {
    return 0;
  }
  // 计算当前的
  const currentCount = count(root, targetSum);

  // 递归计算左右的
  const leftCount = pathSum(root.left, targetSum);
  const rightCount = pathSum(root.right, targetSum);

  return currentCount + leftCount + rightCount;
};

function count(node: TreeNode | null, sum: number): number {
  if (node === null) {
    return 0;
  }

  const isCurrentVal = node.val === sum ? 1 : 0;

  const leftPaths = count(node.left, sum - node.val);
  const rightPaths = count(node.right, sum - node.val);

  return isCurrentVal + leftPaths + rightPaths;
}