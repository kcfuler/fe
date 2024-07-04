// 从当前位置找能走到的最远的
function canJump(nums: number[]): boolean {
    let maxReach = 0;

    for (let i = 0; i < nums.length; i++) {
        if (i > maxReach) {
            return false;
        }

        maxReach = Math.max(maxReach, i + nums[i]);

        if (maxReach >= nums.length - 1) {
            return true;
        }
    }

    return false;
}