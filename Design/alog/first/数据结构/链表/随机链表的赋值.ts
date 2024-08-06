import {Node} from "./types";

// 思路是遍历 + 哈希表
function copyRandomList(head: Node | null): Node | null {
    let m = new Map<Node, Node>();

    let current = head;
    while (current !== null) {
        // 注意这里创建了新的链表节点
        m.set(current, new Node(current.val));
        current = current.next;
    }

    current = head;
    while (current !== null) {
        const cloned = m.get(current);
        cloned!.next = m.get(current.next!) ?? null;
        cloned!.random = m.get(current.random!) ?? null;
        current = current.next;
    }

    return m.get(head!) ?? null;
}