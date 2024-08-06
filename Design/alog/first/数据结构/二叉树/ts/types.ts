export class TreeNode {
  val: number
  left: TreeNode | null
  right: TreeNode | null
  constructor(val?: number, left?: TreeNode | null, right?: TreeNode | null) {
    this.val = (val === undefined ? -1 : val)
    this.left = (left === undefined ? null : left)
    this.right = (right === undefined ? null : right)

  }
}