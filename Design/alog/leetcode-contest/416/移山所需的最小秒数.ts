//
/*
 *思路1：
 *  1. 可以使用最小堆的方式，先预处理所有工人的workload
 *  2. 将所有工人的workload加入队列中，每次取最小的，直到得到最后的答案
 *  时间复杂度：O(n) => 这里的n是预处理workload的耗时
 *
 * 思路2：
 *
 * */

/*
 * 思路一的实现
 * */

class MinHeap1 {
    private heap: [number, number][];

    constructor() {
        this.heap = [];
    }

    private parent(i: number): number {
        return Math.floor((i - 1) / 2);
    }

    private leftChild(i: number): number {
        return 2 * i + 1;
    }

    private rightChild(i: number): number {
        return 2 * i + 2;
    }

    private swap(i: number, j: number): void {
        [this.heap[i], this.heap[j]] = [this.heap[j], this.heap[i]];
    }

    push(value: [number, number]): void {
        this.heap.push(value);
        this.siftUp(this.heap.length - 1);
    }

    pop(): [number, number] | undefined {
        if (this.heap.length === 0) return undefined;
        if (this.heap.length === 1) return this.heap.pop();

        const min = this.heap[0];
        this.heap[0] = this.heap.pop()!;
        this.siftDown(0);
        return min;
    }

    private siftUp(i: number): void {
        while (i > 0 && this.heap[this.parent(i)][0] > this.heap[i][0]) {
            this.swap(i, this.parent(i));
            i = this.parent(i);
        }
    }

    private siftDown(i: number): void {
        let minIndex = i;
        const left = this.leftChild(i);
        const right = this.rightChild(i);

        if (left < this.heap.length && this.heap[left][0] < this.heap[minIndex][0]) {
            minIndex = left;
        }
        if (right < this.heap.length && this.heap[right][0] < this.heap[minIndex][0]) {
            minIndex = right;
        }

        if (i !== minIndex) {
            this.swap(i, minIndex);
            this.siftDown(minIndex);
        }
    }

    size(): number {
        return this.heap.length;
    }
}

function minimumSecondsToRemoveMountain(mountainHeight: number, workerTimes: number[]): number {
    const minHeap = new MinHeap1();

    // 初始化每个工人的下一次工作时间为 workerTimes[i], 和已经处理的高度为 0
    for (let i = 0; i < workerTimes.length; i++) {
        minHeap.push([workerTimes[i], i]); // [当前的时间, 工人的编号]
    }

    let totalHeight = 0;
    let currentTime = 0;

    // 我们需要重复这个过程，直到山的高度被完全移除
    while (totalHeight < mountainHeight) {
        // 从堆中取出最早完成工作的工人
        let [time, workerIndex] = minHeap.pop()!;

        // 更新当前的时间为此工人完成工作的时间
        currentTime = time;

        // 增加已完成的高度
        totalHeight++;

        // 计算该工人的下一次工作完成的时间
        let nextTime = time + workerTimes[workerIndex] * (totalHeight + 1);

        // 将该工人的下一次工作时间加入堆中
        if (totalHeight < mountainHeight) {
            minHeap.push([nextTime, workerIndex]);
        }
    }

    return currentTime;
}

// 测试代码
console.log(minimumSecondsToRemoveMountain(5, [1, 2, 3])); // 应输出 18
console.log(minimumSecondsToRemoveMountain(10, [1, 2, 3, 4, 5])); // 应输出 50
console.log(minimumSecondsToRemoveMountain(10, [3, 2, 2, 4])); // 应输出 27