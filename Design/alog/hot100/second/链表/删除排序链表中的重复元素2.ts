/**
 * Definition for singly-linked list.
 * function ListNode(val, next) {
 *     this.val = (val===undefined ? 0 : val)
 *     this.next = (next===undefined ? null : next)
 * }
 */
import {ListNode} from "../../types/List";

/**
 * @param {ListNode} head
 * @return {ListNode}
 */
var deleteDuplicates = function(head: ListNode) {
    if (!head || !head.next) {
        return head
    }

    let dummy = new ListNode(0);
    dummy.next = head;
    let prev = dummy;
    let current = head;

    while (current && current.next) {
        // 遇到重复时，找到最后一个重复的节点
        // 跳过中间的所有节点
        if (current.val === current.next.val) {
            while (current.val === current?.next?.val) {
                current = current.next;
            }
            prev.next = current.next;
        } else {
            prev = prev.next!;
        }
        // 总是移动 current 节点
        current = current.next!;
    }

    return dummy.next;

    return head;
};