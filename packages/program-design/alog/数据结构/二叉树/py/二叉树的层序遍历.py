# Definition for a binary tree node.
import queue
from typing import Optional, List


class TreeNode:
    def __init__(self, val=0, left=None, right=None):
        self.val = val
        self.left = left
        self.right = right
class Solution:
    def levelOrder(self, root: Optional[TreeNode]) -> List[List[int]]:
        ans = []

        que = queue.Queue()
        que.put(root)
        while not que.empty():
            level = []
            for i in range(que.qsize()):
                cur = que.get()
                level.append(cur.val)

                if cur.left:
                    que.put(cur.left)
                if cur.right:
                    que.put(cur.right)

            ans.append(level)

        return ans