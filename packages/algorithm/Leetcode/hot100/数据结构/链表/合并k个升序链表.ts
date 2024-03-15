import {ListNode} from "./types";
import {PriorityQueue} from "../../../data_structure/PriorityQueue/PriorityQueue";

// 这个题的核心在于实现优先队列
function mergeKLists(lists: Array<ListNode | null>): ListNode | null {
    if (!lists.length) return null;

    const minHeap = new PriorityQueue<ListNode>((a, b) => a.val > b.val);

    for (const list of lists) {
        if (list) {
            minHeap.insert(list);
        }
    }

    let dummy: ListNode | null = new ListNode(0);
    let current: ListNode | null = dummy;

    while (!minHeap.isEmpty()) {
        const top = minHeap.extractMax();
        current!.next = top;
        current = current!.next;

        if (top?.next) {
            minHeap.insert(top.next);
        }
    }

    return dummy.next;
}