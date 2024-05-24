import {ListNode} from "./types";

// 注意处理进位
function addTwoNumbers(l1: ListNode | null, l2: ListNode | null): ListNode | null {
    let sumList = new ListNode(-1);
    const dummy = sumList;

    let carry = 0;
    let cur = 0;
    while (l1 !== null || l2 !== null) {
        let x = (l1 !== null) ? l1.val : 0;
        let y = l2 !== null ? l2.val : 0;
        let sum = carry + x + y;
        carry = Math.floor(sum / 10);
        cur = sum % 10;

        sumList.next = new ListNode(cur);
        sumList = sumList.next;
        if (l1 !== null) l1 = l1.next;
        if (l2 !== null) l2 = l2.next;
    }

    if (carry > 0) {
        sumList.next = new ListNode(carry);
    }

    return dummy.next;
}