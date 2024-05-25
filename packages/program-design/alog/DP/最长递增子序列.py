from typing import List


class Solution:
    def lengthOfLIS(self, nums: List[int]) -> int:
        n = len(nums)
        dp = [1] * n
        
        ans = 0
        for i in range(n):
            for j in range(i, n):
                if nums[j] > nums[i]:
                    dp[j] = max(dp[j], dp[i] + 1)

            ans = max(dp[i], ans)

        return ans