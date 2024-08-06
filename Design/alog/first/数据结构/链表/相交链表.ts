import type { ListNode } from './types'

function getIntersectionNode(headA: ListNode | null, headB: ListNode | null): ListNode | null {
  if (!headA || !headB) {
    return null;
  }

  let PA: ListNode | null = headA;
  let PB: ListNode | null = headB;

  // 要么是交叉点，要么是null
  while (PA !== PB) {
    PA = PA === null ? headB : PA.next;
    PB = PB === null ? headA : PB.next;
  }

  return PA;
};