import { ListNode } from "../../types/List";

/**
 *
 * head = [4,2,1,3]
 */
function sortList(head: ListNode | null): ListNode | null {
  if (!head || !head.next) {
    return head;
  }

  let mid = getMid(head);
  let left = head;
  let right = mid.next;
  mid.next = null;

  // 递归处理
  let leftSort = sortList(left);
  let rightSort = sortList(right);

  return mergeList(leftSort, rightSort);
}

function getMid(node: ListNode | null): ListNode {
  let prev = node;
  let slow = node;
  let fast = node;

  while (fast && fast.next) {
    prev = slow;
    slow = slow!.next;
    fast = fast.next.next;
  }

  return prev!;
}

function mergeList(
  nodeLeft: ListNode | null,
  nodeRight: ListNode | null
): ListNode | null {
  if (!nodeLeft || !nodeRight) {
    return nodeLeft ?? nodeRight;
  }

  let dummy = new ListNode(0);
  let cur = dummy;

  while (nodeLeft && nodeRight) {
    if (nodeLeft.val <= nodeRight.val) {
      cur.next = nodeLeft;
      nodeLeft = nodeLeft.next;
    } else {
      cur.next = nodeRight;
      nodeRight = nodeRight.next;
    }
    cur = cur.next;
  }

  if (nodeLeft) {
    cur.next = nodeLeft;
  }
  if (nodeRight) {
    cur.next = nodeRight;
  }

  return dummy.next;
}
