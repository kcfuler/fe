function jump(nums: number[]): number {
    let jumps = 0; // 到达最后一个位置的最小跳跃次数
    let currentJumpEnd = 0; // 当前跳跃能够到达的最远位置
    let farthest = 0; // 下一次跳跃能够到达的最远位置

    // 遍历数组，但不包括最后一个元素，因为我们在跳跃到最后一个元素之前就应该完成跳跃计算
    for (let i = 0; i < nums.length - 1; i++) {
        // 更新下一次能跳跃到的最远的位置
        farthest = Math.max(farthest, i + nums[i]);

        // 如果到达当前跳跃的最远位置，进行跳跃并更新当前跳跃的最远位置
        if (i === currentJumpEnd) {
            jumps++; // 增加跳跃次数
            currentJumpEnd = farthest; // 更新当前跳跃的最远位置
        }
    }

    return jumps;
}