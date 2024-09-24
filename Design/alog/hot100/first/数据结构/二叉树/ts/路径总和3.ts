import {TreeNode} from "./types";

/**
 * 1. 可以从任意节点开始
 * 2. 只能从父节点到根节点
 *
 * 需要保证不同的分支都可以遍历到，需要回溯
 * */
function pathSum_nomal(root: TreeNode | null, targetSum: number): number {
    let ans = 0;

    const dfs = (node: TreeNode | null, curNum: number) => {
        if (node === null) {
            return;
        }

        curNum = curNum * 10 + node.val;
        if (!node.left && !node.right && curNum === targetSum) {
            ans ++;
        }

        dfs(node.left, curNum);
        dfs(node.right, curNum);
    }

    dfs(root, 0);

    return ans;
}

/**
 * 两个问题：
 * 1. 为什么能用前缀和
 * 2. 为什么能用map来存储前缀和的计数
 *
 * A1：为什么能使用前缀和
 *  1. 将一种路径当做一个累加和
 *  2. 我们需要求的是 从某个节点开始，累加之后和等于targetSum的路径
 *  3. 将每个路径看做前缀和累加的一个区间，那么当区间的值等于targetSum时,
 *      cur - oldSum = targetSum成立
 *  4. 也就得到 oldSum = cur - targetSum
 * A2: 为什么能够使用Map来存储前缀和的数量
 *  1. 遍历本身是有顺序的，与题目中的父子条件并不冲突
 *  2. 值并没有限制符号，可能在后面拿到和前面一样的值，回溯保证了不会重复
 *  3. 映射关系如何确定的 => 
 * */
function pathSum_optimize(root: TreeNode | null, targetSum: number): number {
    let ans = 0;
    const prefixSums = new Map<number, number>();

    function dfs(node: TreeNode | null, curNum: number) {
        if (!node) {
            return;
        }

        curNum += node.val;
        const oldVal = curNum - targetSum;
        if (prefixSums.has(oldVal)) {
            ans += prefixSums.get(oldVal)!;
        }
        const beforeUpdateIns = (prefixSums.get(curNum) ?? 0) + 1;
        prefixSums.set(curNum, beforeUpdateIns);

        dfs(node.left, curNum);
        dfs(node.right, curNum);

        const afterUpdateIns = prefixSums.get(curNum)! - 1;
        prefixSums.set(curNum, afterUpdateIns);
    }

    dfs(root, 0);

    return ans;
}