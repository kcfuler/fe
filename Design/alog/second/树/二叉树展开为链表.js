function flatten(root) {
  if (!root) {
    return root;
  }

  let cur = null;
  const dfs = (node) => {
    if (!node) {
      return;
    }

    const left = node.left;
    const right = node.right;

    if (cur) {
      cur.right = node;
      cur.left = null;
    }
    cur = node;

    dfs(left);
    dfs(right);
  };

  dfs(root);
}
