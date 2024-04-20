import { ListNode } from "../../../Leetcode/hot100/数据结构/链表/types";

function rotateRight(head: ListNode | null, k: number): ListNode | null {
  if (!head || !head.next || k === 0) {
    return head;
  }

  let current: ListNode | null = head;
  let length = 1;
  while (current.next !== null) {
    current = current.next;
    length++;
  }

  // 连接链表成环
  current.next = head;

  // 找到新的尾部
  let stepsToNewHead = length - k % length;
  while (stepsToNewHead-- > 0) {
    current = current!.next;
  }

  const newHead = current!.next;
  current!.next = null


  return newHead;
}