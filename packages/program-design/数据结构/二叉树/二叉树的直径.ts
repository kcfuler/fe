import {TreeNode} from "./types";


// 直径 = 左最大深度 + 右最大深度
function diameterOfBinaryTree(root: TreeNode | null): number {
    let res = 0;

    const dfs = (node: TreeNode | null): number => {
        if (node === null) {
            return 0
        }

        const left = dfs(node.left);
        const right = dfs(node.right);

        // 左右最大深度相加
        res = Math.max(res, left + right);

        return Math.max(left, right) + 1;
    }

    dfs(root);

    return res;
};