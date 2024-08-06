/**
 * Definition for singly-linked list.
 * function ListNode(val, next) {
 *     this.val = (val===undefined ? 0 : val)
 *     this.next = (next===undefined ? null : next)
 * }
 */
/**
 * @param {ListNode} head
 * @param {number} k
 * @return {ListNode}
 */
var rotateRight = function (head, k) {
  if (head === null || head.next === null || k === 0) {
    return head;
  }

  let current = head;
  let length = 1;
  while (current.next) {
    current = current.next;
    length++;
  }
  current.next = head;

  let stepToNewHead = length - (k % length);
  while (stepToNewHead-- > 0) {
    current = current.next;
  }

  const newNode = current.next;
  current.next = null;

  return newNode;
};
