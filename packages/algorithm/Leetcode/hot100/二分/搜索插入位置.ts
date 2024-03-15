// 这个题目是找下界
function searchInsert(nums: number[], target: number): number {
    let l = 0, r = nums.length - 1;
    while (l <= r) {
        let mid = Math.floor((r + l) / 2);

        if (nums[mid] >= target) r = mid - 1;
        else l = mid + 1;
    }

    return l;
};