"""
核心思路
1. 双指针
2. 用数组索引模拟链表

Q1: 为什么可以模拟链表
 1. 因为数组的索引和值在[1, n]之间，值可以作为索引
Q2: 为什么能通过双指针找到重复的值
 1. 如果存在重复的值，那么在1的索引过程中，就会形成环
 2. 形成环之后，在遍历的过程中，快慢指针一定会相遇
"""


class Solution:
    def findDuplicate(self, nums: List[int]) -> int:
        slow = nums[0]
        fast = nums[0]
        # 找到相遇点
        while True:
            slow = nums[slow]
            fast = nums[nums[fast]]
            if slow == fast:
                break

        slow = nums[0]
        while slow != fast:
            slow = nums[slow]
            fast = nums[fast]

        return slow
