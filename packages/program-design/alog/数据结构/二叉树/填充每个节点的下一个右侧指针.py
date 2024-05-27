# Definition for a Node.
class Node:
    def __init__(self, val: int = 0, left: 'Node' = None, right: 'Node' = None, next: 'Node' = None):
        self.val = val
        self.left = left
        self.right = right
        self.next = next

from typing import Optional


class Solution:
    def connect(self, root: Optional[Node]) -> Optional[Node]:
        if root == None:
            return root
        # 遍历的思路
        def traverse(p: Node, q: Node) -> Optional[Node]:
            if p == None:
                return p
            p.next = q
            traverse(p.left, p.right)
            traverse(q.left, q.right)
            traverse(p.right, q.left) # 主要的问题在于左右子树中间的相邻节点

        traverse(root.left, root.right)

        return root
            