/*
* 思路和寻找循环链表的入口是类似的
* */
function findDuplicate(nums: number[]): number {
    let slow = nums[0];
    let fast = nums[nums[0]];

    // 第一阶段：找到快慢指针相遇的地方
    while (slow !== fast) {
        slow = nums[slow];
        fast = nums[nums[fast]];
    }

    // 第二阶段，将快指针重新指向起始位置，然后以相同速度移动
    fast = 0;
    while (slow !== fast) {
        slow = nums[slow];
        fast = nums[fast];
    }

    return slow
}