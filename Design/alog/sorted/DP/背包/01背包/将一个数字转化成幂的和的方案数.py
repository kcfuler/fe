from functools import cache


class Solution:
    def numberOfWays(self, n: int, x: int) -> int:
        MOD = 10**9 + 7

        @cache
        def dfs(i, c):
            if i <= 0:
                return 1 if c == 0 else 0

            curr = i**x
            if curr > c:
                return dfs(i - 1, c)
            return (dfs(i - 1, c) + dfs(i - 1, c - curr)) % MOD

        return dfs(n, n)

    # 转换
    def numberOfWays(self, n: int, x: int) -> int:
        MOD = 10 ** 9 + 7

        max_num = 1
        while (max_num ** x) <= n:
            max_num += 1
        max_num -= 1

        f = [[0] * (n + 1) for _ in range(max_num + 1)]
        f[0][0] = 1

        for i in range(max_num):
            cur = (i + 1) ** x
            for c in range(n, -1, -1):  # 逆序遍历
                f[i + 1][c] = f[i][c]
                if c >= cur:
                    f[i + 1][c] = (f[i + 1][c] + f[i][c - cur]) % MOD

        return f[max_num][n]

    # 一维优化
    def numberOfWays(self, n: int, x: int) -> int:
        MOD = 10 ** 9 + 7

        max_num = 1
        while (max_num ** x) <= n:
            max_num += 1
        max_num -= 1

        f = [0] * (n + 1)
        f[0] = 1

        for i in range(max_num):
            cur = (i + 1) ** x
            for c in range(n, -1, -1):  # 逆序遍历
                if c >= cur:
                    f[c] = (f[c] + f[c - cur]) % MOD

        return f[max_num][n]
