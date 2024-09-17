/**
 * Definition for a binary tree node.
 * function TreeNode(val, left, right) {
 *     this.val = (val===undefined ? 0 : val)
 *     this.left = (left===undefined ? null : left)
 *     this.right = (right===undefined ? null : right)
 * }
 */
/**
 * @param {TreeNode} root
 * @return {boolean}
 */
var isBalanced = function(root) {
    if (!root) {
        return true;
    }

    const left = getDepth(root.left);
    const right = getDepth(root.right);

    if (Math.abs(left - right) > 1) {
        return false;
    }

    return isBalanced(root.left) && isBalanced(root.right);
};

function getDepth(root) {
    if (!root) {
        return 0;
    }

    const left = getDepth(root.left);
    const right = getDepth(root.right);

    return Math.max(left, right) + 1;
}