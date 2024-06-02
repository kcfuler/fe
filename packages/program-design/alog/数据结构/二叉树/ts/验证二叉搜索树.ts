import type {TreeNode} from './types'

/* 
二叉搜索树
left < middle < right, 对每一个子树都成立
*/
function isValidBST(root: TreeNode | null): boolean {
    // 遍历过程中维护三个量 node | lower | upper
    const dfs = (node: TreeNode | null, lower: number, upper: number): boolean => {
        if (node === null) {
            return true;
        }

        if (node.val <= lower || node.val >= upper) {
            return false;
        }

        if (!dfs(node.left, lower, node.val)) {
            return false;
        }

        if (!dfs(node.right, node.val, upper)) {
            return false;
        }

        return true;
    }

    return dfs(root, Number.MIN_SAFE_INTEGER, Number.MAX_SAFE_INTEGER);
};