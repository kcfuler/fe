from bisect import bisect_left
from typing import List


class Solution:
    def lengthOfLIS(self, nums: List[int]) -> int:
        # 交换状态和值的定义 -> 构造有序序列 -> 使用二分优化时间空间复杂度
        # 在原有数据上修改，实现 O(1) 的空间复杂度
        # amazing
        ng = 0
        for x in nums:
            j = bisect_left(nums, x, 0, ng)
            if j == ng:
                nums[ng] = x
                ng += 1
            else:
                nums[j] = x
        return ng
