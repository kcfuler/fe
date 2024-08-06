# Definition for a binary tree node.
from typing import Optional


class TreeNode:
    def __init__(self, val=0, left=None, right=None):
        self.val = val
        self.left = left
        self.right = right


class Solution:
    def isValidBST(self, root: Optional[TreeNode]) -> bool:
        def dfs(node: Optional[TreeNode], cur_max: int, cur_min: int) -> bool:
            if not node:
                return True

            if node.val >= cur_max or node.val <= cur_min:
                return False

            return dfs(node.left, node.val, cur_min) and dfs(node.right, cur_max, node.val)

        return dfs(root, int('-inf'), int('inf'))
