/**
 * 使用场景：
 * 运行并发任务，这些任务是互相独立的
 */

/**
 * 问题：
 * 1. 如何保证后面的任务会在前面的任务完成之后执行?
 * 因为在前面的执行中调用了 _processQueue 方法，而这个方法的执行时机是在前面的task执行之后
 * 两种情况:
 *  - 如果没满，就会直接执行task
 *  - 如果满了，那么推入队列，在正在执行中的任务执行完毕之后就执行
 */

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
    .run(() => fetch(`https://www.rust-lang.org/`))
    .then((response) => {
      // 处理响应
    });
}
