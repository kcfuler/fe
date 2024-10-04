from typing import List


class Solution:
    def minimumTime(self, time: List[int], totalTrips: int) -> int:
        left = 1
        right = min(time) * totalTrips  # 最快的车一直运行

        while left <= right:
            mid = (left + right) // 2
            if self.check(time, mid, totalTrips):
                right = mid - 1
            else:
                left = mid + 1

        return left

    def check(self, time: List[int], minTime: int, totalTrips: int) -> bool:
        trips = sum(minTime // t for t in time)

        return trips >= totalTrips
