/*
* 要找到旋转排序数组中的最小元素，并且保持 O(log n) 的时间复杂度，我们可以使用二分搜索。
* 由于数组中的元素是互不相同的，并且原数组是升序排列的，在一次或多次旋转之后，数组可以被看作由两个排序的子数组组成，其中第一个子数组的所有元素都大于第二个子数组的元素。
* 最小元素就是这两个子数组的分界点。
* */
function findMin(nums: number[]): number {
    let left = 0;
    let right = nums.length - 1;

    while (left < right) {
        let mid = Math.floor((left + right) / 2);

        if (nums[mid] < nums[right]) {
            right = mid
        } else {
            left = mid + 1;
        }
        /*
        * 存在重复情况时可以考虑 right--
        * */
    }

    // left 和 right 相遇时，就得到答案
    return nums[left];
}