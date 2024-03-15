import {ListNode} from "./types";

// 使用双指针
function removeNthFromEnd(head: ListNode | null, n: number): ListNode | null {
    const dummy = new ListNode(0);
    dummy.next = head;
    let slow: ListNode | null = dummy;
    let fast: ListNode | null = dummy;

    for (let i = 0; i <= n; i++) {
        if (fast === null) throw new Error('');
        fast = fast.next;
    }
    // 方便删除节点
    while (fast !== null) {
        slow = slow!.next;
        fast = fast.next;
    }

    slow!.next = slow!.next!.next;

    return dummy.next;
}