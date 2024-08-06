import { ListNode } from "./types";

function reverseKGroup(head: ListNode | null, k: number): ListNode | null {
    if (head === null || k === 1) {
        return head;
    }

    let count = 0;
    let current: ListNode | null = head;
    while (current && count < k) {
        current = current.next;
        count++;
    }

    if (count === k) {
        let nextHead = reverseKGroup(current, k);
        let prev = nextHead;
        let cur: ListNode | null = head;

        while (count > 0) {
            let next: ListNode | null = cur!.next;
            cur!.next = prev;
            prev = cur;
            cur = next;
            count--;
        }

        head = prev;
    }

    return head;
}

// test
const testList = new ListNode(0)
let i = 5;
while (i--) {
    testList.next = new ListNode(i);
}

reverseKGroup(testList, 2);