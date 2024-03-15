import { ListNode } from "./types";

function hasCycle(head: ListNode | null): boolean {
  if (head === null) {
    return false;
  }

  let fast = head.next;
  let slow = head;

  while (fast !== null && fast.next !== null) {
    if (slow === fast) {
      return true;
    }
    fast = fast.next.next;
    slow = slow.next!;
  }

  return false;
};