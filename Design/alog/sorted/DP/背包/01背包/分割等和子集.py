from functools import cache
from typing import List


class Solution:
    def canPartition0(self, nums: List[int]) -> bool:
        s = sum(nums)
        n = len(nums)
        if s % 2:
            return False

        target = s // 2
        # 转移方式：从前一个可以转移的状态中判断是否选择
        
        @cache
        def dfs(i, c):
            if i < 0:
                return True if c == 0 else False
            if c < nums[i]:
                return dfs(i - 1, c)
            return dfs(i - 1, c) or dfs(i - 1, c - nums[i])
        
        return dfs(n - 1, target)

    # 转换
    def canPartition1(self, nums: List[int]) -> bool:
        n = len(nums)
        s = sum(nums)

        if s % 2: 
            return False
        target = s // 2
        
        # f[i][c] 与状态转移方程对应 
        f = [[False] * (target + 1) for _ in range(n + 1)]
        f[0][0] = True

        for i, x in enumerate(nums):
            for c in range(target, -1, -1):
                if c < x:
                    f[i + 1][c] = f[i][c]
                else:
                    f[i + 1][c] = f[i][c] or f[i][c - x]
        
        return f[n][target]

    # 滚动数组优化
    def canPartition2(self, nums: List[int]) -> bool:
        n = len(nums)
        s = sum(nums)
        
        if s % 2:
            return False
        target = s // 2

        f = [[False] * (target + 1) for _ in range(2)]
        f[0][0] = True
        for i, x in enumerate(nums):
            for c in range(target, -1, -1):
                if x > c:
                    f[(i + 1) % 2][c] = f[i % 2][c]
                else:
                    f[(i + 1) % 2][c] = f[i % 2][c] or f[i % 2][c - x]
        
        return f[n % 2][target]

    # 一维优化
    def canPartition(self, nums: List[int]) -> bool:
        n = len(nums)
        s = sum(nums)
        
        if s % 2:
            return False
        target = s // 2

        f = [False] * (target + 1)
        f[0] = True
        for x in nums:
            for c in range(target, x - 1, -1):
                f[c] = f[c] or f[c - x]
        
        return f[target]

    # 二进制优化（状态压缩的一种实现）
    def canPartition(self, nums: List[int]) -> bool:
        if len(nums) < 2:
            return False
            
        s = sum(nums)
        if s % 2:
            return False
        target = s // 2
        
        # 使用整数的二进制位表示状态
        dp = 1  # 初始状态只有0可达，即二进制的第0位为1
        for num in nums:
            dp |= dp << num
        
        # 检查target位是否为1
        return bool(dp & (1 << target))