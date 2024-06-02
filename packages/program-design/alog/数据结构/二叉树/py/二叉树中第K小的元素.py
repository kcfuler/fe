from typing import Optional


class TreeNode:
    def __init__(self, val=0, left=None, right=None):
        self.val = val
        self.left = left
        self.right = right


class Solution:
    def kthSmallest(self, root: Optional[TreeNode], k: int) -> int:
        node_val = 0
        cnt = 0

        def inorder(node: TreeNode) -> None:
            nonlocal node_val, cnt

            if not node:
                return

            inorder(node.left)
            cnt += 1
            if cnt == k:
                node_val = node.val
                return
            inorder(node.right)

        inorder(root)

        return node_val
