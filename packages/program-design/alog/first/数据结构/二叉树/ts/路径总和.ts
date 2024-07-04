import {TreeNode} from "./types";

function hasPathSum(root: TreeNode | null, targetSum: number): boolean {
    if (root === null) {
        return false;
    }

    targetSum -= root.val;

    if (!root.left && !root.right) {
        return targetSum === 0
    }

    return hasPathSum(root.left, targetSum) || hasPathSum(root.right, targetSum);
};