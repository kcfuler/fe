from cmath import inf
from functools import cache
from typing import List


class Solution:
    def lengthOfLongestSubsequence0(self, nums: List[int], target: int) -> int:
        n = len(nums)

        # 记忆化搜索的遍历顺序满足子序列的定义
        @cache
        def dfs(i, c):
            if i < 0:
                return 0 if c == 0 else -inf
            if c < nums[i]:
                return dfs(i - 1, c)
            
            return max(dfs(i - 1, c), dfs(i - 1, c - nums[i]) + 1)
        
        ans = dfs(n - 1, target)
        dfs.cache_clear()

        return ans if ans > -1 else -1
    # 转为递推
    # 核心方程：f[i + 1][c] = max(f[i][c], f[i][c - nums[i]] + 1)
    def lengthOfLongestSubsequence1(self, nums: List[int], target: int) -> int:
        n = len(nums)
        f = [[-inf] * (target + 1) for _ in range(n + 1)]
        f[0][0] = 0
        
        for i, x in enumerate(nums): # 每个备选项
            for c in range(target + 1): # 每个中间状态
                if x > c:
                    f[i + 1][c] = f[i][c]
                else:
                    f[i + 1][c] = max(f[i][c], f[i][c-nums[i]] + 1)
        
        ans = f[n][target]
        return ans if ans > -1 else -1

    # 滚动数组优化
    def lengthOfLongestSubsequence2(self, nums: List[int], target: int) ->int:
        n = len(nums)

        f = [[-inf] * (target+1) for _ in range(2)]
        f[0][0] = 0
        for i, x in enumerate(nums):
            for c in range(target + 1):
                if x > c:
                    f[(i + 1) % 2][c] = f[i % 2][c]
                else:
                    f[(i + 1) % 2][c] = max(f[i % 2][c], f[i % 2][c - nums[i]] + 1)
        
        ans = f[n % 2][target]
        
        return ans if ans > -1 else -1
    
    # 优化为一维数组
    # 滚动数组是这样的：
    # f[0] = [.......]  # 上一行
    # f[1] = [.......]  # 当前行

    # 因为我们只需要"记住"上一行的值，而且是从右向左更新
    # 所以可以直接在一个数组上操作：
    # f = [.......]  # 直接在原地更新
    # 从右向左更新确保我们用到的左边的值都是"旧值"
    def lengthOfLongestSubsequence3(self, nums: List[int], target: int) ->int:
        f = [-inf] * (target + 1)
        f[0] = 0
        for x in nums:
            for c in range(target, -1, -1):
                if x > c:
                    f[c] = f[c]
                else:
                    f[c] = max(f[c - x] + 1, f[c])

        ans = f[target]

        return ans if ans > 0 else -1

    # 优化遍历范围
    def lengthOfLongestSubsequence3(self, nums: List[int], target: int) ->int:
        
        f = [-inf] * (target + 1)
        f[0] = 0
        s = 0
        for x in nums:
            s = min(s + x, target)
            for c in range(s, -1, -1):
                f[c] = min(f[c], f[c - x] + 1)
        
        ans = f[target]
        return ans if ans > 0 else -1

        