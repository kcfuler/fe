function findKthLargest(nums: number[], k: number): number {
    const n = nums.length;
    // 我们要寻找的第 k 大元素，也就是 n - k + 1个最小元素
    // 如果数组是升序排列，那么第 k 个最大元素也就是 n - k + 1个最小元素
    return quick_pick(nums, 0, n - 1, n - k + 1);
}

function quick_pick(nums: number[], left: number, right: number, k: number) {
    if (left >= right) return nums[left];

    const x = nums[Math.floor((left + right) / 2)];
    let i = left - 1, j = right + 1;
    while (i < j) {
        do i++; while (x > nums[i]);
        do j--; while (x < nums[j]);

        if (i < j) {
            swap(nums, i, j);
        }
    }

    // 计算基准左侧的元素数量
    const sl = j - left + 1;
    // 左侧元素数量大于等于 k ,那么第k个元素在左侧
    if (sl >= k) {
        return quick_pick(nums, left, j, k);
    } else {
        // 否则，它在右侧，更新减去左侧的元素数量
        return quick_pick(nums, j + 1, right, k - sl);
    }
}

function swap(nums: number[], i: number, j: number) {
    let temp = nums[i];
    nums[i] = nums[j];
    nums[j] = temp;
}
