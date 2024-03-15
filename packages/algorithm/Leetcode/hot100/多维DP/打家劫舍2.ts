function rob(nums: number[]): number {
    if (nums.length === 0) return 0;
    if (nums.length === 1) return nums[0];

    // 直接用两个变量实现dp数组的功能
    function robLinear(houses: number[]) {
        let prevMax = 0; // 代替 dp[i - 2]
        let currMax = 0; // 代替 dp[i - 1]
        for (let i = 0; i < houses.length; i++) {
            let temp = currMax;
            currMax = Math.max(prevMax + houses[i], currMax);
            prevMax = temp;
        }

        return currMax;
    }

    // 不偷第一间 & 不偷最后一间
    return Math.max(robLinear(nums.slice(1)), robLinear(nums.slice(0, -1)));
}