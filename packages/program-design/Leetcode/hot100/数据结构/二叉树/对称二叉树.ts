import {TreeNode} from "./types";

function isSymmetric(root: TreeNode | null): boolean {
    if (root === null) {
        return true;
    }
    /*
    * 左 <-> 右 | 右 <-> 左
    * 注意遍历顺序
    * */
    const dfs = (left: TreeNode | null, right: TreeNode | null): boolean => {
        if (left === null && right === null) {
            return true;
        }
        if (left === null || right === null) {
            return false;
        }
        if (left.val !== right.val) {
            return false;
        }

        return dfs(left.left, right.right) && dfs(left.right, right.left);
    }

    return dfs(root.left, root.right);
};