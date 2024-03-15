import type {TreeNode} from './types'

/*
总体思路是递归查找 p, q 的位置，
根据当前节点和 p , q 的相对位置判断LCA
*/

function lowestCommonAncestor(root: TreeNode | null, p: TreeNode | null, q: TreeNode | null): TreeNode | null {
    if (root === null || root === p || root === q) {
        return root;
    }

    const left = lowestCommonAncestor(root.left, p, q);
    const right = lowestCommonAncestor(root.right, p, q);

    if (left !== null && right !== null) {
        return root;
    }

    if (left === null) {
        return right
    } else {
        return left
    }
}