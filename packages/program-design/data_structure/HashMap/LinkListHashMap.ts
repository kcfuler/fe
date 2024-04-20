// 定义哈希节点类，用于存储每个键值对以及链表中的下一个节点
class HashNode<K, V> {
  public key: K;
  public value: V;
  public next: HashNode<K, V> | null;

  constructor(key: K, value: V, next: HashNode<K, V> | null = null) {
    this.key = key;
    this.value = value;
    this.next = next;
  }
}

// 定义哈希映射类
class HashMap<K, V> {
  private table: Array<HashNode<K, V> | null>;
  private capacity: number;

  constructor(capacity: number = 10) {
    this.capacity = capacity;
    // 初始化哈希表，并填充为 null
    this.table = new Array<HashNode<K, V> | null>(this.capacity).fill(null);
  }

  // 哈希函数，目前仅支持字符串类型的键
  private hash(key: K): number {
    if (typeof key === "string") {
      let hash = 0;
      for (let i = 0; i < key.length; i++) {
        hash = (hash << 5) - hash + key.charCodeAt(i);
        hash |= 0; // Convert to 32bit integer
      }
      return hash % this.capacity;
    } else {
      // 非字符串键暂不支持，实际应用中需要一个更健壮的解决方案
      throw new Error("unsupported key type");
    }
  }

  // 设置键值对
  set(key: K, value: V): void {
    const index = this.hash(key);
    let head = this.table[index];

    // 遍历链表来查找是否已存在节点，如果存在则更新
    while (head !== null) {
      if (head.key === key) {
        head.value = value;
        return;
      }
      head = head.next;
    }

    // 如果不存在，创建一个新节点并插入到链表头部
    const newNode = new HashNode(key, value, this.table[index]);
    this.table[index] = newNode;
  }

  // 根据键获取值
  get(key: K): V | undefined {
    const index = this.hash(key);
    let head = this.table[index];

    // 遍历链表来查找节点
    while (head !== null) {
      if (head.key === key) {
        return head.value;
      }
      head = head.next;
    }

    // 如果找不到节点，返回 undefined
    return undefined;
  }

  // 根据键删除节点
  delete(key: K): boolean {
    const index = this.hash(key);
    let head = this.table[index];
    let prev = null;

    // 遍历链表来查找并删除节点
    while (head !== null) {
      if (head.key === key) {
        if (prev === null) {
          // 如果是头节点，直接将头节点指向下一个节点
          this.table[index] = head.next;
        } else {
          // 如果不是头节点，将前一个节点的 next 指向当前节点的 next
          prev.next = head.next;
        }
        return true;
      }
      prev = head;
      head = head.next;
    }

    // 如果找不到节点，返回 false
    return false;
  }

  // 清空哈希表
  clear(): void {
    this.table = new Array<HashNode<K, V> | null>(this.capacity).fill(null);
  }
}
