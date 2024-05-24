import {TreeNode} from "../数据结构/二叉树/types";

/*
* 1. 二叉树遍历
*   后序遍历
* 2. DP
*   通过递归携带参数的方式表示每个节点的最大值[偷，不偷]
* */
function rob(root: TreeNode | null): number {
    const dfs = (node: TreeNode | null): [number, number] => {
        if (node === null) {
            return [0, 0]
        }

        const left = dfs(node.left);
        const right = dfs(node.right);

        // 不偷节点时，当前节点能得到的最大金额是左右子节点偷和不偷的最大值之和
        const doNotRob = left[0] + right[0];
        // 偷当前节点时，当前节点能得到的最大金额是当前节点的金额加上左右子节点不偷时的金额
        const doRob = node.val + left[1] + right[1];

        // 返回当前节点偷和不偷的最大值
        return [Math.max(doNotRob, doRob), doNotRob];
    }

    const [rob, doNotRob] = dfs(root);
    return Math.max(rob, doNotRob);
}