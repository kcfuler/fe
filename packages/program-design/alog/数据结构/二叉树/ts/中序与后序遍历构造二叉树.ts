import {TreeNode} from "./types";

function buildTree(inorder: number[], postorder: number[]): TreeNode | null {
    if (inorder.length === 0 || postorder.length === 0) {
        return null
    }

    // 后序遍历的最后一个节点是根节点
    const rootVal = postorder.pop();
    const root = new TreeNode(rootVal);

    // 在中序遍历中找到根节点的位置
    const inorderIndex = inorder.indexOf(rootVal!);

    // postorder不需要slice处理的原因是后序遍历，处理了postorder之后，postorder在子树中的顺序是正确的
    root.right = buildTree(inorder.slice(inorderIndex + 1), postorder);
    root.left = buildTree(inorder.slice(0, inorderIndex), postorder);

    return root;
}