import { ListNode } from "../../../Leetcode/hot100/数据结构/链表/types";

function middleNode(head: ListNode | null): ListNode | null {
    let fast = head;
    let slow = head;

    while (fast && fast.next) {
        fast = fast.next.next;
        slow = slow!.next;
    }

    return slow;
}