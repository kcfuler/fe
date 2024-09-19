/**
 * Definition for singly-linked list.
 * class ListNode {
 *     val: number
 *     next: ListNode | null
 *     constructor(val?: number, next?: ListNode | null) {
 *         this.val = (val===undefined ? 0 : val)
 *         this.next = (next===undefined ? null : next)
 *     }
 * }
 */
import {ListNode} from "../../types/List";

function reverseBetween(head: ListNode | null, left: number, right: number): ListNode | null {
    if (!head || left === right) {
        return head;
    }

    const dummy = new ListNode(0);
    dummy.next = head;
    let prev =  dummy;

    // 反转位置的前一个节点
    for (let i = 0; i < left - 1; i ++) {
        prev = prev.next!;
    }

    let start = prev.next; // 维护前一个节点
    let cur = prev.next;

    for (let i = 0; i < right - 1; i++) {
        const next = cur!.next;
        cur!.next = start;
        start = cur;
        cur = next;
    }

    // 反转后, prev.next 依旧指向 start
    prev.next!.next = cur;
    // prev 本身依旧是前一个节点
    prev.next = start;

    return dummy.next;
}