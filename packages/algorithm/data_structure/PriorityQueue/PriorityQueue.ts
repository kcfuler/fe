export class PriorityQueue<T> {
    // 用于存储队列中元素的数组
    private data: T[];
    // 比较器函数，用于确定元素间的优先级
    private readonly comparator: (a: T, b: T) => boolean;

    constructor(comparator: (a: T, b: T) => boolean) {
        this.data = [];
        this.comparator = comparator;
    }

    // 获取给定父节点索引的左子节点索引
    private leftChildIndex(parentIndex: number): number {
        return 2 * parentIndex + 1;
    }

    // 获取给定父节点索引的右子节点索引
    private rightChildIndex(parentIndex: number): number {
        return 2 * parentIndex + 2;
    }

    // 获取给定子节点索引的父节点索引
    private parentIndex(childIndex: number): number {
        return Math.floor((childIndex - 1) / 2);
    }

    // 交换数组中两个元素的位置
    private swap(index1: number, index2: number): void {
        [this.data[index1], this.data[index2]] = [this.data[index2], this.data[index1]];
    }

    // 向上调整元素以保持堆的性质
    private siftUp(): void {
        let nodeIndex = this.data.length - 1;
        let parentIndex = this.parentIndex(nodeIndex);

        // 当节点不是根节点，并且比父节点优先级高时，进行交换
        while (
            nodeIndex > 0 &&
            this.comparator(this.data[nodeIndex], this.data[parentIndex])
            ) {
            this.swap(nodeIndex, parentIndex);
            nodeIndex = parentIndex;
            parentIndex = this.parentIndex(nodeIndex);
        }
    }

    // 向下调整元素以保持堆的性质
    private siftDown(): void {
        let nodeIndex = 0;
        let leftChildIndex = this.leftChildIndex(nodeIndex);
        let rightChildIndex = this.rightChildIndex(nodeIndex);
        let largerChildIndex = nodeIndex;

        // 当存在左子节点时，进行比较并交换
        while (leftChildIndex < this.data.length) {
            if (this.comparator(this.data[leftChildIndex], this.data[largerChildIndex])) {
                largerChildIndex = leftChildIndex;
            }

            // 如果存在右子节点，并且右子节点的优先级更高，更新 largerChildIndex
            if (
                rightChildIndex < this.data.length &&
                this.comparator(this.data[rightChildIndex], this.data[largerChildIndex])
            ) {
                largerChildIndex = rightChildIndex;
            }

            // 如果最大元素就是当前节点，停止调整
            if (largerChildIndex === nodeIndex) {
                break;
            } else {
                // 否则，交换并继续向下调整
                this.swap(nodeIndex, largerChildIndex);
                nodeIndex = largerChildIndex;
                leftChildIndex = this.leftChildIndex(nodeIndex);
                rightChildIndex = this.rightChildIndex(nodeIndex);
            }
        }
    }

    // 插入一个新元素到优先队列
    insert(value: T): void {
        this.data.push(value);
        this.siftUp();
    }

    // 移除并返回优先队列中最大的元素
    extractMax(): T | null {
        if (this.isEmpty()) {
            return null;
        }

        // 将最大元素与数组末尾元素交换，然后移除末尾元素
        this.swap(0, this.data.length - 1);
        const maxValue = this.data.pop()!;
        this.siftDown();
        return maxValue;
    }

    // 检查优先队列是否为空
    isEmpty(): boolean {
        return this.data.length === 0;
    }

    // 获取优先队列中的元素数量
    size(): number {
        return this.data.length;
    }

    // 查看优先队列中的最大元素
    peek(): T | null {
        if (this.data.length === 0) {
            return null;
        }

        return this.data[0];
    }
}
