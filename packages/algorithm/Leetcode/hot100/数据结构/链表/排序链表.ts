import {ListNode} from "./types";

// 最优做法是归并排序思想
// => 找中点 + 合并有序链表 + 归并
function sortList(head: ListNode | null): ListNode | null {
    if (!head || !head.next) return head;

    const mid = getMid(head);
    const left = head;
    const right = mid!.next;
    mid.next = null;

    const leftSorted = sortList(left);
    const rightSorted = sortList(right)

    return merge(leftSorted, rightSorted);
}

// 使用prev的作用是让我们在中点的前一位断开链表
function getMid(head: ListNode | null): ListNode {
    let slow = head;
    let fast = head;
    let prev = head;

    while (fast && fast.next) {
        prev = slow;
        slow = slow!.next;
        fast = fast.next.next;
    }

    return prev!;
}

function merge(left: ListNode | null, right: ListNode | null): ListNode {
    let dummy = new ListNode(0);
    let current = dummy.next;

    while (left && right) {
        if (left.val < right.val) {
            current!.next = left
            left = left.next;
        } else {
            current!.next = right;
            right = right.next;
        }
        current = current!.next;
    }

    if (left)
        current!.next = left;
    else
        current!.next = right;

    return dummy.next!;
}