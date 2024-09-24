var lowestCommonAncestor = function (root, p, q) {
  // 基本情况：如果根为空，或者根就是 p 或 q 中的一个，返回根
  if (root === null || root === p || root === q) {
    return root;
  }

  const left = lowestCommonAncestor(root.left, p, q);
  const right = lowestCommonAncestor(root.right, p, q);

  // 如果这个节点左右节点都存在，则它是LCA
  if (left !== null && right !== null) {
    return root;
  }

  if (left !== null) {
    return left;
  }

  if (right !== null) {
    return right;
  }

  return null;
};
