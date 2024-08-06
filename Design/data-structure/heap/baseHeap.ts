class MyMinHeap<T> {
  heap: T[];
  capacity: number;
  constructor(capacity: number) {
    this.heap = new Array();
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
      let smallest = cur;

      if (this.heap[smallest] > this.heap[left]) {
        smallest = left;
      }
      if (this.heap[smallest] > this.heap[right]) {
        smallest = right;
      }

      if (smallest !== cur) {
        this.swap(cur, smallest);
        cur = smallest;
      } else {
        break;
      }
    }
  }

  addItem(newItem: T) {
    if (this.heap.length >= this.capacity) {
      return false;
    }
    this.heap.push(newItem);
    this.shiftUp(this.heap.length - 1);
  }

  extractItem(): T | null {
    if (this.heap.length < 1) {
      return null;
    }

    this.swap(0, this.heap.length - 1);
    const item = this.heap.pop()!;
    this.shiftDown(0);

    return item;
  }

  getHeap() {
    return this.heap;
  }
}

const heap = new MyMinHeap<number>(10);
for (let i = 0; i < 10; i++) {
  heap.addItem(Math.random() * 10);
}

while (true) {
  let item = heap.extractItem();
  if (!item) {
    break;
  }
  console.log("item", item);
}
