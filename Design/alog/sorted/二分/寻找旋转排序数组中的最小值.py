class Solution:
    def findMin(self, nums: List[int]) -> int:
        left = 0
        right = len(nums) - 2

        while left <= right:
            mid = (left + right) // 2
            if nums[mid] < nums[-1]: # 核心，和最后一位做对比
                right = mid - 1
            else:
                left = mid + 1
        
        return nums[left]
