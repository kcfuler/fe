from cmath import inf
from functools import cache
from typing import List

class Solution:
    def coinChange(self, coins: List[int], amount: int) -> int:
        n = len(coins)
        @cache
        def dfs(i, c):
            if i < 0: 
                return 0 if c == 0 else inf
            if c < coins[i]:
                return dfs(i - 1, c)
            return min(dfs(i - 1, c), dfs(i, c - coins[i]) + 1)
        
        ans = dfs(n - 1, amount)
        return ans if ans < inf else -1
    
    def coinChangeWithIter(self, coins: List[int], amount: int) -> int:
        n = len(coins)
        """ 
        这里f数组怎么来的: dfs(i, c) -> f[i][c]
        """
        f = [[inf] * (amount + 1) for _ in range(n + 1)]
        f[0][0] = 0
        for i, x in enumerate(coins):
            for c in range(amount + 1):
                if c < x:
                    # 使用 i + 1 避免出现负数下标
                    f[i + 1][c] = f[i][c]
                else:
                    f[i + 1][c] = min(f[i][c], f[i + 1][c - x] + 1)
        
        ans = f[n][amount]

        return ans if ans < inf else -1

    # 滚动数组优化
    """ 
    优化的核心点在于状态转移方程本身
    每次计算完 i + 1 之后，就不需要 i 了 -> 每时每刻只有两个数组在参与状态转移
    使用 % 2的方式，在两个数组中转移状态
    """
    def optimize1(self, coins: List[int], amount: int) -> int:
        n = len(coins)
        f = [[inf] * (amount + 1) for _ in range(2)]
        
        f[0][0] = 0
        for i, x in enumerate(coins):
            for c in range(amount + 1):
                if c < x:
                    # 使用 i + 1 避免出现负数下标
                    f[(i+1) % 2][c] = f[(i+1) % 2][c]
                else:
                    f[i][c] = min(f[i][c], f[i + 1][c - x] + 1)
        
        ans = f[n][amount]

        return ans if ans < inf else -1
   