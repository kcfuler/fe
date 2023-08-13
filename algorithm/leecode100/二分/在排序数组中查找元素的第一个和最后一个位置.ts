function searchRange(nums: number[], target: number): number[] {
    const leftIndex = findIndex(nums, target, true);
    const rightIndex = findIndex(nums, target, false);

    return [leftIndex, rightIndex];
};

function findIndex(nums :number[], target: number, left: boolean): number {
    let low = 0, high = nums.length - 1;
    let index = -1;

    while (low <= high) {
        const mid = Math.floor((low + high) / 2);

        // 默认是上界，在所求为下界时left为true，不断像
        if (nums[mid] > target || (left && nums[mid] === target)) {
            high = mid - 1;
        } else {
            low = mid + 1;
        }

        if (nums[mid] === target) {
            index = mid;
        }
    }

    return index;
}

console.log(searchRange([1, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 3, 4], 2))