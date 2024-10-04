class Solution:
    def maximumTastiness(self, price: List[int], k: int) -> int:
        price.sort()  # 先排序降低check的复杂度

        def check(d: int) -> bool:
            cnt, pre = 1, price[0]
            for p in price:
                if p >= pre + d:  # 遍历，看有多少糖果能够满足惊喜度要求
                    cnt += 1
                    pre = p
            return cnt >= k  # 能够满足要求

        left = 0
        right = (price[-1] - price[0])
        while left <= right:
            mid = (left + right) // 2
            if check(mid):
                left = mid + 1
            else:
                right = mid - 1

        return right  # 小一点的答案
