class Solution:
    def maxNumberOfAlloys(self, n: int, k: int, budget: int, composition: List[List[int]], stock: List[int],
                          cost: List[int]) -> int:
        '''
        对一台机器来说，指定output，判断是否能够满足
        cost | stock | budget | composition
        转化 <=> 满足output，是否超预算
        '''

        def check(output) -> bool:
            for machine in composition:
                total_cost = 0
                for i in range(n):
                    needed = output * machine[i]  # 更高效的计算
                    if needed > stock[i]:
                        total_cost += (needed - stock[i]) * cost[i]

                if total_cost <= budget:
                    return True

            return False

        left = 0
        right = budget + sum(stock)

        while left <= right:
            mid = (left + right) // 2
            if check(mid):
                left = mid + 1
            else:
                right = mid - 1

        return right
