export class PriorityQueue<T> {
    private heap: T[];
    private comparator: (a: T, b: T) => boolean;

    constructor(comparator: (a: T, b: T) => boolean) {
        this.heap = [];
        this.comparator = comparator
    }

    down() {
        let parent = 0;
        let leftChild = parent * 2 + 1;
        let rightChild = parent * 2 + 2;
        let largerChild = parent;

        while (leftChild < this.size()) {
            if (this.comparator(this.heap[largerChild], this.heap[leftChild])) {
                largerChild = leftChild;
            }
            if (rightChild < this.size() && this.comparator(this.heap[largerChild], this.heap[rightChild])) {
                largerChild = rightChild;
            }
            if (largerChild === parent) {
                break;
            }
            this.swap(parent, largerChild);
            parent = largerChild;
            leftChild = parent * 2 + 1;
            rightChild = parent * 2 + 2;
        }
    }

    up() {
        let child = this.size() - 1;
        let parent = Math.floor((child - 1) / 2);

        while (child > 0 && this.comparator(this.heap[parent], this.heap[child])) {
            this.swap(parent, child);
            child = parent;
            parent = Math.floor((child - 1) / 2);
        }
    }

    shift() {
        if (this.isEmpty()) {
            return null;
        }

        this.swap(0, this.size() - 1);
        const val = this.heap.pop()!;
        this.down();
        return val;
    }

    insert(val: T) {
        this.heap.push(val);
        this.up();
    }

    swap(a: number, b: number) {
        [this.heap[a], this.heap[b]] = [this.heap[b], this.heap[a]];
    }

    peek() {
        return this.heap[0];
    }

    size() {
        return this.heap.length;
    }

    isEmpty() {
        return this.heap.length === 0;
    }
}
