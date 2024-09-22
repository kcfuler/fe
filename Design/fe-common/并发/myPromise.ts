/**
 * 基础需求：
 * 1. 链式调用 -> 返回新的实例
 * 2. 异步状态更新 -> browser: queueMicroTask | node: process.nextTick
 * 3. 状态定义: pending | resolved | rejected， 状态不能回退
 *
 * 使用方法：
 * 1. resolve：存储 resolved 对应的 tasks
 * 2. reject: 存储 rejected 对应的 tasks
 * 3. then: 返回一个新的 promise
 *
 * ps: 暂时不处理异步任务
 * */

import * as process from "node:process";

/**
 * 同步任务
 * */
type Task = (value?: any) => any;

/**
 * 传入的 executor
 * */
type Executor = (resolve: Task, reject: Task) => void;

/**
 * promise 三个状态定义
 * */
enum PromiseStatus {
  pending,
  fulfilled,
  rejected,
}

class MyPromise {
  status: PromiseStatus;
  resolvedTasks: Task[];
  rejectedTasks: Task[];
  value: any; // 传递的状态

  constructor(executor: Executor) {
    this.status = PromiseStatus.pending;
    this.resolvedTasks = [];
    this.rejectedTasks = [];

    // 放在constructor 中，是因为放外面，用this.resolve的方式传入时会丢引用
    const resolve = (value: any) => {
      this.value = value;
      this.status = PromiseStatus.fulfilled;
      this.resolvedTasks.forEach((task) => task());
    };

    const reject = (reason: any) => {
      this.value = reason;
      this.status = PromiseStatus.rejected;
      this.rejectedTasks.forEach((task) => task());
    };

    // 执行最开始的状态转换
    executor(resolve, reject);
  }

  then(onFulfilled?: Task, onRejected?: Task) {
    onFulfilled =
      typeof onFulfilled === "function" ? onFulfilled : (value) => value;
    onRejected =
      typeof onRejected === "function"
        ? onRejected
        : (reason) => {
            throw reason;
          };
    return new MyPromise((resolve, reject) => {
      // 如果是 pending ，暂存任务
      if (this.status === PromiseStatus.pending) {
        this.resolvedTasks.push(() => {
          // 包裹微任务
          transformToMicroTask(() => {
            const x = onFulfilled(this.value);
            resolvePromise(resolve, reject, x);
          });
        });

        this.rejectedTasks.push(() => {
          transformToMicroTask(() => {
            const x = onRejected(this.value);
            resolvePromise(resolve, reject, x);
          });
        });
      }

      if (this.status === PromiseStatus.fulfilled) {
        try {
          const x = onFulfilled(this.value);
          resolvePromise(resolve, reject, x);
        } catch (e) {
          reject(e);
        }
      }

      if (this.status === PromiseStatus.rejected) {
        try {
          const x = onRejected(this.value);
          resolvePromise(resolve, reject, x);
        } catch (e) {
          reject(e);
        }
      }
    });
  }
}

function resolvePromise(resolve: Task, reject: Task, x: any) {
  // 检测循环调用
  if (x === resolve || x === reject) {
    return reject(new TypeError(""));
  }
  // 处理 then 中返回 promise 的情况
  if (x instanceof MyPromise) {
    x.then(resolve, reject); // 如果返回值是一个 Promise，继续调用
  } else {
    resolve(x); // 否则直接返回 resolve
  }
}

/*
 * 根据环境判断，转换微任务
 * */
function transformToMicroTask(task: Task) {
  // 浏览器环境
  if (typeof window !== "undefined" && window.queueMicrotask) {
    window.queueMicrotask(task);
  } else if (typeof process !== "undefined" && process.nextTick) {
    process.nextTick(task);
  } else {
    setTimeout(task, 0);
  }
}

// const p = new Promise((resolve) => resolve(1)).then((value) => console.log(value)).then

// @ts-ignore
const assert = require("assert");

// 测试同步任务
const testSyncResolve = () => {
  const promise = new MyPromise((resolve, _) => {
    resolve("Success");
  });

  promise.then((value) => {
    assert.strictEqual(
      value,
      "Success",
      "testSyncResolve failed: expected 'Success'",
    );
  });
};

const testSyncReject = () => {
  const promise = new MyPromise((_, reject) => {
    reject("Error");
  });

  promise.then(undefined, (reason) => {
    assert.strictEqual(
      reason,
      "Error",
      "testSyncReject failed: expected 'Error'",
    );
  });
};

// 测试链式调用
const testChaining = () => {
  const promise = new MyPromise((resolve, _) => {
    resolve(1);
  });

  promise
    .then((value) => {
      assert.strictEqual(value, 1, "testChaining failed at step 1: expected 1");
      return value + 1;
    })
    .then((value) => {
      assert.strictEqual(value, 2, "testChaining failed at step 2: expected 2");
      return value + 1;
    })
    .then((value) => {
      assert.strictEqual(value, 3, "testChaining failed at step 3: expected 3");
    });
};

// 测试异步任务
const testAsyncResolve = (done: any) => {
  const promise = new MyPromise((resolve, _) => {
    setTimeout(() => {
      resolve("Async Success");
    }, 100);
  });

  promise.then((value) => {
    assert.strictEqual(
      value,
      "Async Success",
      "testAsyncResolve failed: expected 'Async Success'",
    );
    done();
  });
};

const testAsyncReject = (done: any) => {
  const promise = new MyPromise((_, reject) => {
    setTimeout(() => {
      reject("Async Error");
    }, 100);
  });

  promise.then(undefined, (reason) => {
    assert.strictEqual(
      reason,
      "Async Error",
      "testAsyncReject failed: expected 'Async Error'",
    );
    done();
  });
};

// 测试 then 中抛出异常
const testThrowInThen = () => {
  const promise = new MyPromise((resolve, _) => {
    resolve("Success");
  });

  promise
    .then(() => {
      throw new Error("Error in then");
    })
    .then(undefined, (error) => {
      assert.strictEqual(
        error.message,
        "Error in then",
        "testThrowInThen failed: expected 'Error in then'",
      );
    });
};

// 测试返回 Promise
const testReturnPromise = () => {
  const promise = new MyPromise((resolve, _) => {
    resolve("Initial");
  });

  promise
    .then((value) => {
      assert.strictEqual(
        value,
        "Initial",
        "testReturnPromise failed at step 1: expected 'Initial'",
      );
      return new MyPromise((resolve) => {
        resolve("Chained Promise");
      });
    })
    .then((value) => {
      assert.strictEqual(
        value,
        "Chained Promise",
        "testReturnPromise failed at step 2: expected 'Chained Promise'",
      );
    });
};

// 执行所有测试
const runTests = () => {
  try {
    testSyncResolve();
    testSyncReject();
    testChaining();
    testThrowInThen();
    testReturnPromise();

    // 异步测试需要传递 `done` 回调来表示测试结束
    testAsyncResolve(() => {
      console.log("testAsyncResolve passed");
    });

    testAsyncReject(() => {
      console.log("testAsyncReject passed");
    });

    console.log("All sync tests passed");
  } catch (error: any) {
    console.error(error.message);
  }
};

runTests();
