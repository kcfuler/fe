import { TreeNode } from "./types";


// 使用递归的方法做
function sortedArrayToBST(nums: number[]): TreeNode | null {
  if (nums.length === 0) return null

  const convertListToBST = (left: number, right: number) => {
    if (left > right) {
      return null;
    }

    let mid = Math.floor((left + right) / 2);
    let node = new TreeNode(nums[mid]);

    node.left = convertListToBST(left, mid - 1);
    node.right = convertListToBST(mid + 1, right);

    return node
  }

  return convertListToBST(0, nums.length)
};