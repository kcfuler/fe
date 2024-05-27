# Definition for a binary tree node.
from typing import Optional


class TreeNode:
    def __init__(self, val=0, left=None, right=None):
        self.val = val
        self.left = left
        self.right = right
class Solution:
    def flatten(self, root: Optional[TreeNode]) -> None:
        if not root:
            return root
        self.flatten(root.left)
        self.flatten(root.right)
        # 后序遍历，能够保证自底向上 & 编辑每一个子树节点
        left = root.left
        right = root.right

        root.left = None
        root.right = left
        
        p = root
        while p.right:
            p = p.right
        p.right = right
