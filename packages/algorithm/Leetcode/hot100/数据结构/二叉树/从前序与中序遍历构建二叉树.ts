import {TreeNode} from './types'

// 使用slice，简洁！
function buildTree(preorder: number[], inorder: number[]): TreeNode | null {
    if (preorder.length === 0 || inorder.length === 0) {
        return null;
    }

    const rootVal = preorder[0];
    const root = new TreeNode(rootVal);

    const mid = inorder.indexOf(rootVal);

    // inorder用slice的索引规则跳过了rootVal
    root.left = buildTree(preorder.slice(1, mid + 1), inorder.slice(0, mid));
    root.right = buildTree(preorder.slice(mid + 1), inorder.slice(mid + 1))

    return root
};