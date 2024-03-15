import type { ListNode } from "./types";

function reverseList(head: ListNode | null): ListNode | null {
  if (head === null || head.next === null) {
    return head;
  }

  // 保存末尾节点
  let newHead = reverseList(head.next);

  head.next.next = head;
  head.next = null;

  return newHead;
};