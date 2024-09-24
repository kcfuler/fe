from typing import List


# [left, right] 闭区间二分
def lower_bound(nums: List[int], target: int) -> int:
    left = 0
    right = len(nums) - 1
    while left <= right:
        mid = (left + right) // 2
        if nums[mid] < target:
            left = mid + 1  # [mid + 1, right]
        else:
            right = mid - 1  # [left, mid - 1]
    return left


# 左闭右开区间 [left, mid)
def lower_bound1(nums: List[int], target: int) -> int:
    left = 0
    right = len(nums)
    while left < right:  # 区间不为空, 等于的时候区间是空的
        mid = (left + right) // 2
        if nums[mid] < target:
            left = mid + 1  # [mid + 1, right)
        else:
            right = mid  # [left, mid)
    return left


# 开区间 (left, mid)
def lower_bound2(nums: List[int], target: int) -> int:
    left = -1
    right = len(nums)
    while left + 1 < right:  # 区间不为空, 等于的时候区间是空的
        mid = (left + right) // 2
        if nums[mid] < target:
            left = mid  # (mid, right)
        else:
            right = mid  # [left, mid)
    return left


# 针对不同的场景
# >= ,  > <=> >= x + 1
# <  ,  (>=x) - 1
# <= ,  (> x) - 1

class Solution:
    def searchRange(self, nums: List[int], target: int) -> List[int]:
        # >=
        start = lower_bound(nums, target)
        if start == len(nums) or nums[start] != target:
            return [-1, -1]
        end = lower_bound(nums, target + 1) - 1

        return [start, end]
