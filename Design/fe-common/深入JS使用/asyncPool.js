/**
 * @param {number} poolLimit
 * @param {Array} array
 * @param {Function} iteratorFn
 */
async function asyncPool(poolLimit, array, iteratorFn) {
  const ret = [],
    executing = [];

  for (const item of array) {
    const p = Promise.resolve(iteratorFn(item));
    ret.push(p);
    if (poolLimit < array.length) {
      const e = p.finally(() => executing.splice(executing.indexOf(e), 1));
      executing.push(e);
      if (executing.length >= poolLimit) {
        await Promise.race(executing);
      }
    }
  }
  return Promise.all(ret);
}

const timeout = (i) =>
  new Promise((resolve) =>
    setTimeout(() => {
      console.log(i);
      resolve(i);
    }, i)
  );

asyncPool(2, [1000, 5000, 3000, 2000, 4000, 6000], timeout);

class Scheduler {
  constructor(size = 2) {
    this.size = size;
    this.queue = [];
    this.running = 0;
  }

  // 返回promise，外部调用者可以知道每个任务的执行状态
  add(task) {
    return new Promise((resolve, reject) => {
      this.queue.push(() => task().then(resolve, reject));
      this.executeNext();
    });
  }

  executeNext() {
    if (this.queue.length && this.running < this.size) {
      const task = this.queue.shift(); // 可能存在性能问题，最好改成 pop
      // 通过 promise 状态的变动来完成任务的轮转
      task().finally(() => {
        this.running--;
        this.executeNext();
      });
      this.running++;
    }
  }
}
