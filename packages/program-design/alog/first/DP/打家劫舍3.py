class TreeNode:
    def __init__(self, val=0, left=None, right=None):
        self.val = val
        self.left = left
        self.right = right
from typing import Optional, Tuple


class Solution:
    def rob(self, root: Optional[TreeNode]) -> int:
        def rob_subtree(node: Optional[TreeNode]) -> Tuple[int, int]:
            if not node:
                return (0, 0)

            left = rob_subtree(node.left)
            right = rob_subtree(node.right)

            rob_current = node.val + left[1] + right[1]
            not_rob_current = max(left) + max(right)

            return (rob_current, not_rob_current)
        
        return max(rob_subtree(root)) 