from typing import List

""" 
迭代的过程中，f表示是否可达 -> 以它为起点
"""


class Solution:
    def maxTotalReward_2d(rewardValues: List[int]) -> int:
        n = len(rewardValues)
        max_sum = sum(x for x in rewardValues if x > 0)

        # dp[mask][sum] 表示在选择状态为mask时，是否可以达到和为sum
        dp = [[False] * (max_sum + 1) for _ in range(1 << n)]
        dp[0][0] = True  # 初始状态
        max_sums = [0] * (1 << n)

        # 遍历所有可能的选择状态
        for mask in range(1 << n):
            for curr_sum in range(max_sum + 1):
                if not dp[mask][curr_sum]:
                    continue

                # 更新当前掩码的最大和
                max_sums[mask] = max(max_sums[mask], curr_sum)

                # 尝试选择未使用的数
                for i in range(n):
                    # 如果位置i未被使用且值大于当前和
                    if not (mask & (1 << i)) and rewardValues[i] > curr_sum:
                        new_mask = mask | (1 << i)
                        new_sum = curr_sum + rewardValues[i]
                        dp[new_mask][new_sum] = True

        return max(max_sums)

    """
    一维DP的状态定义和转移：
    dp[sum] 表示是否可以达到和为sum
    使用 排序+遍历顺序 来保证每个数只使用一次
    """

    def maxTotalReward_1d(rewardValues: List[int]) -> int:
        max_sum = sum(x for x in rewardValues if x > 0)

        # dp[sum] 表示是否可以达到和为sum
        dp = [False] * (max_sum + 1)
        dp[0] = True
        curr_max = 0

        # 遍历每个奖励值
        for val in sorted(rewardValues):
            # 从大到小遍历当前和
            for curr_sum in range(curr_max, -1, -1):
                if dp[curr_sum] and val > curr_sum:
                    dp[curr_sum + val] = True
                    curr_max = max(curr_max, curr_sum + val)

        return curr_max
