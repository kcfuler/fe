# Definition for a binary tree node.
class TreeNode:
    def __init__(self, val=0, left=None, right=None):
        self.val = val
        self.left = left
        self.right = right
class Solution:
    def diameterOfBinaryTree(self, root: Optional[TreeNode]) -> int:
        ans = 0
        def dfs(node: Optional[TreeNode]):
            nonlocal ans
            if not node:
                return 0

            cnt_left = dfs(node.left)
            cnt_right = dfs(node.right)
            ans = max(ans, cnt_right + cnt_left)

            return 1 + max(cnt_left, cnt_right)

        dfs(root)

        return ans