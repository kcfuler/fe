function isPalindrome(head: ListNode | null): boolean {
  if (!head) {
    return true;
  }
  const stk = [];

  let fast = head;
  let slow = head;

  while (fast && fast.next) {
    stk.push(slow.val);
    slow = slow.next;
    fast = fast.next.next;
  }

  if (fast) {
    slow = slow.next;
  }

  while (slow) {
    if (slow.val !== stk.pop()) {
      return false;
    }
    slow = slow.next;
  }

  return true;
}
