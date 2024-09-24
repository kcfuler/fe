var pathSum = function (root, targetSum) {
  if (!root) return 0;

  return (
    pathSumFrom(root, targetSum) +
    pathSum(root.left, targetSum) +
    pathSum(root.right, targetSum)
  );
};

function pathSumFrom(root, targetSum) {
  if (!root) {
    return 0;
  }

  let count = 0;
  if (root.val === targetSum) count++;

  count += pathSumFrom(root.left, targetSum - root.val);
  count += pathSumFrom(root.right, targetSum - root.val);

  return count;
}
