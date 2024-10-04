import math
from typing import List


class Solution:
    def minEatingSpeed(self, piles: List[int], h: int) -> int:
        left = 1
        right = max(piles)

        while left <= right:
            mid = (left + right) // 2
            if self.check(piles, mid, h):
                right = mid - 1
            else:
                left = mid + 1

        return left

    def check(self, piles: List[int], k: int, h: int) -> bool:
        needTime = 0

        for pile in piles:
            needTime += math.ceil(pile / k)

        return needTime <= h
