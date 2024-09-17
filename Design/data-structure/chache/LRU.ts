class DoubleLinkedList {
    val: number;
    key: number;
    prev: DoubleLinkedList | null;
    next: DoubleLinkedList | null;
    constructor(key: number ,val: number) {
        this.val = val;
        this.key = key;
        this.prev = null;
        this.next = null;
    }

}

class LRUCache {
    map: Map<number, DoubleLinkedList>;
    head: DoubleLinkedList;
    tail: DoubleLinkedList;
    capacity: number;
    size: number;
    constructor(capacity: number){
        this.map = new Map();
        this.capacity = capacity;
        this.size = 0;
        this.head = new DoubleLinkedList(-1, -1);
        this.tail = new DoubleLinkedList(-1, -1);

        this.head.next = this.tail;
        this.tail.prev = this.head;
    }

    get(key: number): number {
        if (!this.map.has(key)) {
            return -1;
        }

        const node = this.map.get(key)!;
        this.removeNode(node);
        this.addToHead(node);

        return node.val;
    }

    put(key: number, value: number): void {
        if (this.map.has(key)) {
            const node = this.map.get(key)!;
            node.val = value;
            this.removeNode(node);
            this.addToHead(node);
        } else {
            const newNode = new DoubleLinkedList(key, value);
            this.addToHead(newNode);
            this.map.set(key, newNode);
            this.size ++;

            if (this.size > this.capacity) {
                const lastNode = this.tail.prev!;

                this.removeNode(lastNode);
                this.map.delete(lastNode.key);
            }
        }
    }

    // 双向链表相关方法
    addToHead(node: DoubleLinkedList) {
        this.head.next!.prev = node;
        node.next = this.head.next;
        node.prev = this.head;
        this.head.next = node;
    }

    removeNode(node: DoubleLinkedList) {
        node.prev!.next = node.next;
        node.next!.prev = node.prev;
    }

}
