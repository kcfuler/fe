class MyPromise {
  constructor(executor) {
    this.state = "pending"; // Promise 的初始状态
    this.value = undefined; // Promise 成功的值
    this.reason = undefined; // Promise 失败的原因
    this.onFulfilledCallbacks = []; // 处理成功回调的队列
    this.onRejectedCallbacks = []; // 处理失败回调的队列

    const resolve = (value) => {
      if (this.state === "pending") {
        this.state = "fulfilled";
        this.value = value;
        this.onFulfilledCallbacks.forEach((fn) => fn());
      }
    };

    const reject = (reason) => {
      if (this.state === "pending") {
        this.state = "rejected";
        this.reason = reason;
        this.onRejectedCallbacks.forEach((fn) => fn());
      }
    };

    // 执行 executor，捕获执行中的错误，如果有错误则调用 reject
    try {
      executor(resolve, reject);
    } catch (error) {
      reject(error);
    }
  }

  // then 方法实现
  then(onFulfilled, onRejected) {
    // 如果 onFulfilled 或 onRejected 不是函数，给它们赋默认值
    onFulfilled =
      typeof onFulfilled === "function" ? onFulfilled : (value) => value;
    onRejected =
      typeof onRejected === "function"
        ? onRejected
        : (reason) => {
            throw reason;
          };

    // 返回一个新的 Promise，以支持链式调用
    return new MyPromise((resolve, reject) => {
      if (this.state === "fulfilled") {
        // 异步执行，确保符合 A+ 规范
        setTimeout(() => {
          try {
            const x = onFulfilled(this.value);
            resolvePromise(resolve, reject, x);
          } catch (error) {
            reject(error);
          }
        }, 0);
      } else if (this.state === "rejected") {
        setTimeout(() => {
          try {
            const x = onRejected(this.reason);
            resolvePromise(resolve, reject, x);
          } catch (error) {
            reject(error);
          }
        }, 0);
      } else if (this.state === "pending") {
        // 如果状态是 pending，将回调存储起来，等状态改变后再执行
        this.onFulfilledCallbacks.push(() => {
          setTimeout(() => {
            try {
              const x = onFulfilled(this.value);
              resolvePromise(resolve, reject, x);
            } catch (error) {
              reject(error);
            }
          }, 0);
        });

        this.onRejectedCallbacks.push(() => {
          setTimeout(() => {
            try {
              const x = onRejected(this.reason);
              resolvePromise(resolve, reject, x);
            } catch (error) {
              reject(error);
            }
          }, 0);
        });
      }
    });
  }

  catch(onRejected) {
    return this.then(null, onRejected);
  }

  static resolve(value) {
    return new MyPromise((resolve) => {
      resolve(value);
    });
  }

  static reject(reason) {
    return new MyPromise((_, reject) => {
      reject(reason);
    });
  }

  static all(promises) {
    return new MyPromise((resolve, reject) => {
      const resultArray = [];
      let count = 0;

      function processResult(index, value) {
        resultArray[index] = value;
        count++;
        if (count === promises.length) {
          resolve(resultArray);
        }
      }

      for (let i = 0; i < promises.length; i++) {
        MyPromise.resolve(promises[i]).then(
          (value) => processResult(i, value),
          (reason) => reject(reason),
        );
      }
    });
  }

  static race(promises) {
    return new MyPromise((resolve, reject) => {
      for (let i = 0; i < promises.length; i++) {
        MyPromise.resolve(promises[i]).then(resolve, reject);
      }
    });
  }
}

// 处理 then 返回值的辅助函数，确保 Promise 链式调用
function resolvePromise(resolve, reject, x) {
  if (x === resolve || x === reject) {
    return reject(new TypeError("Chaining cycle detected for promise"));
  }

  if (x instanceof MyPromise) {
    x.then(resolve, reject); // 如果返回值是一个 Promise，继续调用
  } else {
    resolve(x); // 否则直接 resolve
  }
}
