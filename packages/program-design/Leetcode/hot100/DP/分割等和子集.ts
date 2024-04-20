// 问题可以转化为一个子集和问题，即是否可以在数组中找到一个子集，其和等于数组总和的一半。
function canPartition(nums: number[]): boolean {
    const totalSum = nums.reduce((sum, num) => sum + num, 0);

    if (totalSum % 2 !== 0) return false;

    const target = Math.floor(totalSum / 2);
    // dp[i] 表示到能否找到和为 i 的子集
    const dp: boolean[] = new Array(target + 1).fill(false);
    dp[0] = true;

    // 向下遍历是为了避免在一次循环中重复使用数据
    for (const num of nums) {
        for (let j = target; j >= num; j--) {
            dp[j] = dp[j] || dp[j - num];
        }
    }

    return dp[target];
}