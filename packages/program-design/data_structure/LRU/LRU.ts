/*
* HashMap <-> O(1)的数据存取
* 双向链表  <-> O(1)的节点移除
*   封装链表的存取操作
*
* 注意节点信息在map和链表之间的同步
* */

class DoubleLinkListNode {
    key: number;
    value: number;
    prev: DoubleLinkListNode | null;
    next: DoubleLinkListNode | null;

    constructor(key: number, value: number) {
        this.key = key;
        this.value = value;
        this.prev = null;
        this.next = null;
    }
}

export class LRUCache {
    capacity: number;
    cache: Map<number, DoubleLinkListNode>;
    head: DoubleLinkListNode;
    tail: DoubleLinkListNode;

    constructor(capacity: number) {
        this.capacity = capacity;
        this.cache = new Map<number, DoubleLinkListNode>();
        // 初始化双向链表
        this.head = new DoubleLinkListNode(0, 0);
        this.tail = new DoubleLinkListNode(0, 0);
        this.head.next = this.tail;
        this.tail.prev = this.head;
    }

    get(key: number): number {
        const node = this.cache.get(key);
        if (node) {
            this.moveToHead(node);
            return node.value;
        }
        return -1;
    }

    put(key: number, value: number): void {
        const node = this.cache.get(key);
        if (node) {
            node.value = value;
            this.moveToHead(node);
        } else {
            const newNode = new DoubleLinkListNode(key, value);
            this.addToHead(newNode);
            this.cache.set(key, newNode);
            if (this.cache.size > this.capacity) {
                this.removeLRUItem();
            }
        }
    }

    removeLRUItem() {
        const lru = this.tail.prev;
        if (lru) {
            this.removeFromList(lru);
            this.cache.delete(lru.key);
        }
    }

    moveToHead(node: DoubleLinkListNode) {
        this.removeFromList(node);
        this.addToHead(node);
    }

    addToHead(node: DoubleLinkListNode) {
        node.prev = this.head;
        node.next = this.head.next;
        this.head.next.prev = node;
        this.head.next = node;
    }

    removeFromList(node: DoubleLinkListNode) {
        node.prev.next = node.next;
        node.next.prev = node.prev;
    }
}
