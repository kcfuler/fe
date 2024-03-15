import type { ListNode } from "./types";

function reverseList(head: ListNode | null): ListNode | null {
  let prev: ListNode | null = null;
  let cur: ListNode | null = head;
  let next: ListNode | null = null;

  while (cur !== null) {
    next = cur.next;
    cur.next = prev;
    prev = cur;
    cur = next;
  }

  return prev;
};