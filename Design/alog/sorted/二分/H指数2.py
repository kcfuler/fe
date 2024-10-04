from bisect import bisect_left
from typing import List


class Solution:
    def hIndex(self, citations: List[int]) -> int:
        left = 1
        right = len(citations)

        while left <= right:
            mid = left + (right - left) // 2
            # 这里使用 -index ，因为整体index往右移了一位，需要避免越界
            if citations[-mid] >= mid:
                left = mid + 1
            else:
                right = mid - 1

        return right


print(Solution().hIndex([0, 1, 3, 5, 6]))
print(Solution().hIndex([1, 2, 1000]))
