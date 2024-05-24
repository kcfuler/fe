function findTargetSumWays(nums: number[], target: number): number {
    let sum = nums.reduce((acc, num) => acc + num, 0);

    // 如果目标值大于总和或者总和加目标值是奇数，则不可能实现目标
    if (Math.abs(target) > sum || (sum + target) % 2 !== 0) return 0;

    let newTarget = Math.abs((sum + target)) / 2;
    let dp = new Array(newTarget + 1).fill(0);
    dp[0] = 1 // 不选择任何元素时，和为零的方法只有一种

    // 动态规划填表
    for (let num of nums) { // 遍历数组中的每个数
        for (let j = newTarget; j >= num; j--) {
            // dp[j] 包括不使用num的情况(dp[j]不变）和使用当前数字的情况(dp[j - num])
            dp[j] += dp[j - num];
        }
    }

    // 返回和为newTarget的不同表达式的数目，即为所求答案
    return dp[newTarget];
}