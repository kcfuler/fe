import {TreeNode} from './types'

// 前序遍历
function flatten(root: TreeNode | null): void {
    if (root === null) {
        return;
    }

    let current = new TreeNode(0); // 定义一个辅助节点
    //前序遍历的原因是题目要求前序遍历
    const preTraverse = (node: TreeNode | null) => {
        if (node === null) {
            return;
        }

        const left = node.left;
        const right = node.right;

        current.right = node;
        current.left = null;
        current = node;

        preTraverse(left);
        preTraverse(right);
    }

    preTraverse(root);
};