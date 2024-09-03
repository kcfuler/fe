function buildTree(inorder, postorder) {
  if (inorder.length === 0 || postorder === 0) {
    return null;
  }

  const rootVal = postorder.pop();
  const root = new TreeNode(rootVal);

  const inorderIndex = inorder.indexOf(rootVal);

  // 后续遍历，这里需要遵循 根 - 右 - 左 的顺序
  root.right = buildTree(inorder.slice(inorderIndex + 1), postorder);
  root.left = buildTree(inorder.slice(0, inorderIndex), postorder);

  return root;
}
