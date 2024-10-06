class Solution:
    def search(self, nums: List[int], target: int) -> int:
        def is_blue(i: int) -> bool:
            end = nums[-1]
            """
            通过与 end 作比较，可以确定 一个数 是在哪一段
            当 target & nums[mid] 在同一个段之后，就可以用常规二分的思路去解决它了 
            分三种情况讨论：
            1. 
            """
            if nums[i] > end:
                return target > end and nums[i] >= target
            else:
                return target > end or nums[i] >= target

        left = -1
        right = len(nums) 

        while left + 1 < right:
            mid = (left + right) // 2
            if is_blue(mid):
                right = mid
            else:
                left = mid

        if right == len(nums) or nums[right] != target:
            return -1

        return right