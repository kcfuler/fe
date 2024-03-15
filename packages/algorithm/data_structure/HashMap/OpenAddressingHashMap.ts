class OpenAddressingHashMap<K, V> {
    // 存储键值对的数组，以及它们是否活跃（即未被删除）
    private table: Array<{ key: K; value: V; isActive: boolean }>;
    // 哈希表的容量
    private capacity: number;
    // 哈希表中键值对的数量
    private size: number;

    // 构造函数，默认初始化容量为16
    constructor(initialCapacity: number = 16) {
        this.capacity = initialCapacity;
        this.table = new Array(this.capacity);
        this.size = 0;
    }

    // 哈希函数，目前仅支持字符串类型的键
    private hash(key: K): number {
        if (typeof key === 'string') {
            let hash = 0;
            for (let i = 0; i < key.length; i++) {
                hash = 31 * hash + key.charCodeAt(i);
            }
            return hash % this.capacity;
        } else {
            throw new Error('Unsupported key type');
        }
    }

    // 插入或更新键值对
    set(key: K, value: V): void {
        if (this.size === this.capacity) {
            throw new Error('Hash table is full');
        }

        let index = this.hash(key);
        let originalIndex = index;
        let dummyIndex = -1;

        do {
            // 如果找到空位，插入新键值对
            if (!this.table[index]) {
                if (dummyIndex !== -1) {
                    index = dummyIndex;
                }
                this.table[index] = {key, value, isActive: true};
                this.size++;
                return;
            }

            // 如果找到了相同的活跃键，更新值
            if (this.table[index].isActive && this.table[index].key === key) {
                this.table[index].value = value;
                return;
            }

            // 记录第一个遇到的非活跃槽位
            if (dummyIndex === -1 && !this.table[index].isActive) {
                dummyIndex = index;
            }

            // 线性探测到下一个槽位
            index = (index + 1) % this.capacity;
        } while (index !== originalIndex); // 如果绕回到原点，停止循环
    }

    // 根据键查找值
    get(key: K): V | undefined {
        let index = this.hash(key);
        let originalIndex = index;

        do {
            // 如果遇到空槽位，表示键不存在
            if (!this.table[index]) {
                return undefined;
            }

            // 如果找到活跃的键，返回对应的值
            if (this.table[index].isActive && this.table[index].key === key) {
                return this.table[index].value;
            }

            // 线性探测到下一个槽位
            index = (index + 1) % this.capacity;
        } while (index !== originalIndex); // 如果绕回到原点，停止循环

        return undefined;
    }

    // 删除键值对
    delete(key: K): boolean {
        let index = this.hash(key);
        let originalIndex = index;

        do {
            // 如果遇到空槽位，表示键不存在
            if (!this.table[index]) {
                return false;
            }

            // 如果找到活跃的键，标记为非活跃并减小大小
            if (this.table[index].isActive && this.table[index].key === key) {
                this.table[index].isActive = false;
                this.size--;
                return true;
            }

            // 线性探测到下一个槽位
            index = (index + 1) % this.capacity;
        } while (index !== originalIndex); // 如果绕回到原点，停止循环

        return false;
    }

    // 获取哈希表中键值对的数量
    getSize(): number {
        return this.size;
    }

    // 清空哈希表
    clear(): void {
        this.table = new Array(this.capacity);
        this.size = 0;
    }

    // 检查键是否存在
    has(key: K): boolean {
        return this.get(key) !== undefined;
    }
}

// 使用示例
const hashMap = new OpenAddressingHashMap<string, number>();
hashMap.set('one', 1);
hashMap.set('two', 2);
console.log(hashMap.get('one')); // 输出: 1
hashMap.delete('one');
console.log(hashMap.has('one')); // 输出: false
