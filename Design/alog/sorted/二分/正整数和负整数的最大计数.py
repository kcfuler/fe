from typing import List


def lower_bound(nums: List[int], target: int) -> int:
    left = 0
    right = len(nums) - 1

    while left <= right:
        mid = (left + right) // 2
        if nums[mid] < target:  # [left + 1, right]
            left = mid + 1
        else:  # [left, mid - 1]
            right = mid - 1

    return left


class Solution:
    def maximumCount(self, nums: List[int]) -> int:
        # >= 1
        positive = lower_bound(nums, 1)
        # <= -1
        negative = lower_bound(nums, 0) - 1

        print(positive, negative)

        return max(len(nums) - positive, negative + 1)


print(Solution().maximumCount([-3, -2, -1, 0, 0, 1, 2]))
