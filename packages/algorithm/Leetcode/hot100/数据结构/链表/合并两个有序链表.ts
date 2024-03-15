import {ListNode} from "./types";

function mergeTwoLists(list1: ListNode | null, list2: ListNode | null): ListNode | null {
    let newList : ListNode = new ListNode(-1);
    const dummy = newList;

    while (list1 !== null && list2 !== null) {
        if (list1.val < list2.val) {
            newList.next = new ListNode(list1.val) ;
            list1 = list1.next;
        } else {
            newList.next = new ListNode(list2.val) ;
            list2 = list2.next;
        }
        newList = newList.next;
    }

    if (list1 !== null) newList.next = list1;
    else newList.next = list2;

    return dummy.next;
};