function searchRange(nums: number[], target: number): number[] {
    const len = nums.length;
    const ans: number[] = [-1, -1];
    // 下界
    let left = 0, right = len - 1;
    while (left <= right) {
        let mid = Math.floor((left + right) / 2);
        if (nums[mid] < target) left = mid + 1;
        else right = mid - 1;
    }
    if (left < len && nums[left] === target) {
        ans[0] = left;
    }

    // 上界
    left = 0;
    right = len - 1;
    while (left <= right) {
        let mid = Math.floor((left + right) / 2);
        if (nums[mid] <= target) left = mid + 1;
        else right = mid - 1;
    }
    if (right >= 0 && nums[right] === target) {
        ans[1] = right;
    }

    return ans
}