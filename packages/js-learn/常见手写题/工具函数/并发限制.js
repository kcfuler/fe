class ConcurrencyPool {
  constructor(maxConcurrency) {
    this.maxConcurrency = maxConcurrency;
    this.current = 0;
    this.queue = [];
  }

  async run(task) {
    if (this.current < this.maxConcurrency) {
      this.current++;
      try {
        const result = await task();
        this._processQueue();
        return result;
      } catch (error) {
        this._processQueue();
        throw error;
      } finally {
        this.current--;
      }
    } else {
      return new Promise((resolve, reject) => {
        this.queue.push(() => this.run(task).then(resolve).catch(reject));
      });
    }
  }

  _processQueue() {
    if (this.queue.length > 0 && this.current < this.maxConcurrency) {
      const task = this.queue.shift();
      task();
    }
  }
}

// 使用示例
const pool = new ConcurrencyPool(5); // 最大并发数设置为 5
for (let i = 0; i < 10; i++) {
  pool
    .run(() => fetch(`https://example.com/data/${i}`))
    .then((response) => {
      // 处理响应
    });
}
