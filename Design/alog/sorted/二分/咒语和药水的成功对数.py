from bisect import bisect_right, bisect_left
from typing import List


def lower_bound(nums: List[int], target) -> int:
    left = 0
    right = len(nums) - 1

    while left <= right:
        mid = (left + right) // 2
        if nums[mid] < target:
            left = left + 1
        else:
            right = mid - 1

    return left


class Solution:
    def successfulPairs(self, spells: List[int], potions: List[int], success: int) -> List[int]:
        potions.sort()
        m = len(potions)
        success -= 1  # 这里有数学恒等式 ⌈a/b⌉ = ⌊(a+b-1)/b⌋ 的变换
        return [m - bisect_right(potions, success // x) for x in spells]

    def successfulPairs1(self, spells: List[int], potions: List[int], success: int) -> List[int]:
        potions.sort()
        m = len(potions)
        return [m - lower_bound(potions, success / x) for x in spells]


print(Solution().successfulPairs([5, 1, 3], [1, 2, 3, 4, 5], 7))
