class MinHeap {
  heap: number[];

  constructor() {
    this.heap = [];
  }

  insert(val: number) {
    this.heap.push(val);
    this.bubbleUp(this.heap.length - 1);
  }

  extract(): number | null {
    const min = this.heap[0];
    const last = this.heap.pop();

    if (this.heap.length > 0 && last !== undefined) {
      this.heap[0] = last;
      this.bubbleDown(0);
    }

    return min ?? null;
  }

  peek() {
    return this.heap.length > 0 ? this.heap[0] : null;
  }

  size() {
    return this.heap.length;
  }

  bubbleUp(index: number) {
    while (index > 0) {
      let parentIdx = Math.floor((index - 1) / 2);
      if (this.heap[parentIdx] > this.heap[index]) {
        [this.heap[parentIdx], this.heap[index]] = [
          this.heap[index],
          this.heap[parentIdx],
        ];
        index = parentIdx;
      } else {
        break;
      }
    }
  }

  bubbleDown(index: number) {
    const size = this.heap.length;
    let smallest = index;

    while (true) {
      const leftChild = 2 * index + 1;
      const rightChild = 2 * index + 2;
      if (leftChild < size && this.heap[leftChild] < this.heap[smallest]) {
        smallest = leftChild;
      }
      if (rightChild < size && this.heap[rightChild] < this.heap[smallest]) {
        smallest = rightChild;
      }
      if (smallest !== index) {
        [this.heap[index], this.heap[smallest]] = [
          this.heap[smallest],
          this.heap[index],
        ];
        index = smallest;
      } else {
        break;
      }
    }
  }
}

class MaxHeap extends MinHeap {
  constructor() {
    super();
  }

  insert(val: number) {
    super.insert(-val);
  }

  peek(): number | null {
    const val = super.peek();
    return val !== null ? -val : null;
  }

  extract(): number | null {
    const val = super.extract();
    return val !== null ? -val : null;
  }
}

class MedianFinder {
  private minHeap: MinHeap;
  private maxHeap: MaxHeap;

  constructor() {
    this.minHeap = new MinHeap();
    this.maxHeap = new MaxHeap();
  }

  addNum(num: number): void {
    this.maxHeap.insert(num); // 大堆维护小值
    this.minHeap.insert(this.maxHeap.extract()!); // 小堆维护大值

    if (this.minHeap.size() > this.maxHeap.size()) {
      this.maxHeap.insert(this.minHeap.extract()!);
    }
  }

  findMedian(): number {
    if (this.maxHeap.size() > this.minHeap.size()) {
      return this.maxHeap.peek()!;
    } else {
      // 这里不需要Math.floor
      return (this.maxHeap.peek()! + this.minHeap.peek()!) / 2;
    }
  }
}
