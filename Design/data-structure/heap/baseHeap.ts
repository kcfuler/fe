interface MyMinHeapItem {
  value: number;
}

class MyMinHeap<T extends MyMinHeapItem> {
  heap: T[];
  capacity: number;
  constructor(capacity: number) {
    this.heap = new Array(capacity);
    this.capacity = capacity;
  }

  left(i: number): number {
    return i * 2 + 1;
  }
  right(i: number): number {
    return i * 2 + 2;
  }

  parent(i: number) {
    return Math.floor((i - 1) / 2);
  }

  swap(i: number, j: number) {
    const temp = this.heap[i];
    this.heap[i] = this.heap[j];
    this.heap[j] = temp;
  }

  shiftUp(i: number) {
    let cur = i;
    while (true) {
      const p = this.parent(cur);
      if (p < 0 || this.heap[cur] >= this.heap[p]) {
        break;
      }
      this.swap(p, cur);
      cur = p;
    }
  }

  shiftDown(i: number) {
    let cur = i;
    while (true) {
      let left = this.left(cur);
      let right = this.right(cur);

      if (left >= this.capacity || right >= this.capacity) {
        break;
      }

      if (this.heap[i] > this.heap[left]) {
        this.swap(left, i);
        i = left;
      }
      if (this.heap[i] > this.heap[right]) {
        this.swap(right, i);
        i = right;
      }
    }
  }

  addItem(newItem: T) {
    if (this.heap.length + 1 >= this.capacity) {
      return false;
    }
    this.heap.push(newItem);
    this.shiftUp(this.heap.length - 1);
  }

  extractItem(): T | false {
    if (this.heap.length < 1) {
      return false;
    }

    this.swap(0, this.heap.length - 1);
    this.shiftDown(0);

    return this.heap.pop()!;
  }

  getHeap() {
    return this.heap;
  }
}

const heap = new MyMinHeap(100);
for (let i = 0; i < 100; i++) {
  heap.addItem({ value: Math.random() * 100 });
}

console.log("heap", heap.getHeap());
