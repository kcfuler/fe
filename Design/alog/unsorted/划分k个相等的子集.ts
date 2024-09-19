/**
 * @param nums
 * @param k
 * 题目：
 * 给定一个整数数组  nums 和一个正整数 k，找出是否有可能把这个数组分成 k 个非空子集，其总和都相等。
 *
 * 解决思路：
 * 1. 前置检查，保证它是能被划分为 k 份的
 */

function canPartitionKSubsets(nums: number[], k: number): boolean {
    // 计算数组总和
    const sum = nums.reduce((sum, num) => sum + num, 0);

    // 如果总和不能被K整除，直接返回false
    if (sum % k !== 0)  return false;

    // 目标和
    const targetSum = sum / k;

    // 对数组做降序排列，提高效率
    nums.sort((a, b) => b - a);

    // 如果最大的数大于目标和，直接返回false
    if (nums[0] > targetSum) return false;

    // 创建一个长度为k的数组，存储每个子集的当前和
    const subset = new Array(k).fill(0);

    function backtrack(index: number) {
        if (index === nums.length) return true;

        // 所有子集都尝试当前数字
        // 配合回溯，枚举所有组合
        for (let i = 0; i < k; i++) {
            if (subset[i] + nums[index] <= targetSum) {
                subset[i] += nums[index];
                if (backtrack(index + 1)) return true;
                subset[i] -= nums[index];
            }

            if (subset[i] === 0) break;
        }

        return false;
    }

    return backtrack(0);
}