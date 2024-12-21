from functools import cache
from typing import List


class Solution:
    def find_max_form(self, strs: List[str], m: int, n: int) -> int:
        def count_zeros_ones(s: str):
            zeros = s.count('0')
            ones = len(s) - zeros
            return zeros, ones

        counts = [count_zeros_ones(s) for s in strs]

        @cache
        def dfs(i, z, o):
            if i == len(strs) or (z <= 0 and o <= 0):
                return 0
            curr_zero, curr_one = counts[i]

            dont_take = dfs(i + 1, z, o)
            take = 0
            if z >= curr_zero and o >= curr_one:
                take = 1 + dfs(i + 1, z - curr_zero, o - curr_one)

            return max(take, dont_take)

        return dfs(0, m, n)

    def find_max_form_iteration(self, strs: List[str], m: int, n: int) -> int:
        f = [[0] * (n + 1) for _ in range(m + 1)]

        for s in strs:
            curr_zeros = s.count('0')
            curr_ones = len(s) - curr_zeros

            for zero in range(m, curr_zeros - 1, -1):
                for one in range(n, curr_ones - 1, -1):
                    f[zero][one] = max(f[zero][one], f[zero - curr_zeros][one - curr_ones] + 1)

        return f[m][n]