import type { ListNode } from './types'

/* 
快慢指针 + 反转链表
*/
function isPalindrome(head: ListNode | null): boolean {
  if (head === null || head.next === null) {
    return true;
  }
  let firstHalfEnd = findHalf(head);
  let secondHalfStart = reverseList(firstHalfEnd.next);

  let result = true;
  let p1 = head;
  let p2 = secondHalfStart;
  while (p1 !== null && p2 !== null) {
    if (p1.val !== p2.val) {
      result = false;
      break;
    }

    p1 = p1.next!;
    p2 = p2.next;
  }

  firstHalfEnd.next = reverseList(secondHalfStart);

  return result;
};

function reverseList(head: ListNode | null): ListNode | null {
  if (head === null || head.next === null) {
    return head;
  }

  const newHead = reverseList(head.next);

  head.next.next = head;
  head.next = null

  return newHead;
}

function findHalf(head: ListNode) {
  let fast: ListNode | null = head;
  let slow: ListNode | null = head;

  while (fast.next !== null && fast.next.next !== null) {
    fast = fast.next.next;
    slow = slow!.next;
  }

  return slow!;
}