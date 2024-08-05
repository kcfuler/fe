/**
 * Definition for a binary tree node.
 * class TreeNode {
 *     val: number
 *     left: TreeNode | null
 *     right: TreeNode | null
 *     constructor(val?: number, left?: TreeNode | null, right?: TreeNode | null) {
 *         this.val = (val===undefined ? 0 : val)
 *         this.left = (left===undefined ? null : left)
 *         this.right = (right===undefined ? null : right)
 *     }
 * }
 */

import { TreeNode } from "../../first/数据结构/二叉树/ts/types";

function pathSum(root: TreeNode | null, targetSum: number): number[][] {
  const result: number[][] = [];
  const path: number[] = [];

  const dfs = (node: TreeNode | null, cnt: number) => {
    if (node === null) {
      return;
    }

    path.push(node.val);
    const curCnt = cnt + node.val;

    if (!node.left && !node.right && curCnt === targetSum) {
      result.push([...path]);
    } else {
      node.left && dfs(node.left, curCnt);
      node.right && dfs(node.right, curCnt);
    }

    path.pop();
  };

  dfs(root, 0);

  return result;
}
