/**
 * Definition for a binary tree node.
 * function TreeNode(val) {
 *     this.val = val;
 *     this.left = this.right = null;
 * }
 */
/**
 * @param {number[]} preorder
 * @param {number[]} inorder
 * @return {TreeNode}
 */
let hash = {};
var buildTree = function (preorder, inorder) {
  if (!preorder.length || !inorder.length) {
    return null;
  }
  // 添加编号
  for (let i = 0; i < inorder.length; i++) {
    hash[inorder[i]] = i;
  }

  return dfs(preorder, inorder, 0, preorder.length - 1, 0, inorder.length - 1);
};

function dfs(preorder, inorder, pl, pr, il, ir) {
  if (pl > pr) {
    return null;
  }

  let root = new TreeNode(preorder[pl]);
  let inorderRootIndex = hash[preorder[pl]];
  let leftLength = inorderRootIndex - il;

  root.left = dfs(
    preorder,
    inorder,
    pl + 1,
    pl + leftLength,
    il,
    inorderRootIndex - 1
  );
  root.right = dfs(
    preorder,
    inorder,
    pl + leftLength + 1,
    pr,
    inorderRootIndex + 1,
    ir
  );

  return root;
}

console.log(buildTree([3, 9, 20, 15, 7], [9, 3, 15, 20, 7]));
