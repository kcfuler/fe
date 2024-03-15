// 因为题目只需要最后的答案信息，使用三个变量即可
function maxProduct(nums: number[]): number {
    if (nums.length === 0) {
        return 0;
    }

    // 考虑负数的情况
    let maxProd = nums[0];
    let minProd = nums[0];
    let maxSoFar = nums[0];

    for (let i = 1; i < nums.length; i++) {
        let tempMax = Math.max(nums[i], maxProd * nums[i], minProd * nums[i]);
        minProd = Math.min(nums[i], maxProd * nums[i], minProd * nums[i]);

        maxProd = tempMax;
        maxSoFar = Math.max(maxSoFar, maxProd);
    }

    return maxSoFar;
}