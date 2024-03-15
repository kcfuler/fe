import type { ListNode } from "./types";

/* 
这个题需要借助一个小结论
入口 = x
交点 = y
起点 = s

s -> x = a
x -> y = b
y -> x = c

第一次相遇时
slow = a + b
fast = a + b + n(b + c)

因为 2 * slow = fast

得 a + b = n (b + c)
当 n = 1时， a = c，所以移到起点，再一起移动，会在 y 相交
*/
function detectCycle(head: ListNode | null): ListNode | null {
  if (head === null) {
    return null;
  }

  let fast: ListNode | null = head;
  let slow: ListNode | null = head;
  let hasCycle = false;

  while (fast !== null && fast.next !== null) {
    fast = fast.next.next;
    slow = slow.next!;

    if (fast === slow) {
      hasCycle = true;
      break;
    }

  }

  if (hasCycle) {
    slow = head;

    while (fast !== slow) {
      // 因为有环，所以不会空
      fast = fast!.next!;
      slow = slow.next!;
    }

    return slow;
  }

  return null;
};