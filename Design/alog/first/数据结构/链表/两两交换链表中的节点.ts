import {ListNode} from "./types";

// 使用三个指针两两交换节点即可
function swapPairs(head: ListNode | null): ListNode | null {
    const dummy = new ListNode(0);
    dummy.next = head;
    let prev = dummy;

    while (prev.next !== null && prev.next.next !== null) {
        let first = prev.next;
        let second = prev.next.next;

        // 交换节点
        first.next = second.next;
        second.next = first
        prev.next = second;

        // 移动prev指针
        prev = first;
    }

    return dummy.next;
}