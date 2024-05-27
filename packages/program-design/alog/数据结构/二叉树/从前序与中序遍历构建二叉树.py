# Definition for a binary tree node.
from typing import List


class TreeNode:
    def __init__(self, val=0, left=None, right=None):
        self.val = val
        self.left = left
        self.right = right
    
class Solution:
    def buildTree(self, preorder: List[int], inorder: List[int]) -> Optional[TreeNode]:
        valueToIndex = {}
        for i, n in enumerate(inorder):
            valueToIndex[n] = i
        
        def build(preStart, preEnd, inStart, inEnd):
            if preStart > preEnd:
                return None
            rootVal = preorder[preStart]
            index = valueToIndex.get(rootVal)
            leftSize = index - inStart
            
            root = TreeNode(rootVal)

            root.left = build(preStart + 1, preStart + leftSize, inStart, index - 1)
            root.right = build(preStart + leftSize + 1, preEnd, index + 1, inEnd)
            
            return root
        
        return build(0, len(preorder) - 1, 0, len(inorder) - 1)


        