const PENDING = 'pending'
const FULFILLED = 'fulfilled'
const REJECTED = 'rejected'

class MyPromise {
  constructor(executor) {
    this.state = PENDING;
    this.value = undefined;
    this.reason = undefined;
    this.onFulfilledCallbacks = [];
    this.onRejectedCallbacks = [];

    const resolve = (value) => {
      if (this.state === PENDING) {
        this.state = FULFILLED;
        this.value = value;
        this.onFulfilledCallbacks.forEach(fn => fn());
      }
    }

    const reject = (reason) => {
      if (this.state === PENDING) {
        this.state = REJECTED;
        this.reason = reason;
        this.onRejectedCallbacks.forEach(fn => fn());
      }
    }

    try {
      executor(resolve, reject);
    } catch (err) {
      reject(err);
    }
  }

  

  then = (onFulfilled, onRejected) => {
    if (this.state === FULFILLED) {
      onFulfilled(this.value);  
    }
    if (this.state === REJECTED) {
      onRejected(this.reason);
    }
    if (this.state === PENDING) {
      this.onFulfilledCallbacks.push(() => {
        onFulfilled(this.value);
      })
      this.onRejectedCallbacks.push(() => {
        onRejected(this.reason);
      })
    }
  }

  catch = (onRejected) => {
    if (this.state === REJECTED) {
      onRejected(this.reason);
    }
    if (this.state === PENDING) {
      this.onRejectedCallbacks.push(() => {
        onRejected(this.reason);
      })
    }
  }
}

const myPromise = new MyPromise((resolve, reject) => {
  setTimeout(() => {
    resolve("Success!");
  }, 1000);
});

// 第一个成功回调
myPromise.then((value) => {
  console.log("First then:", value);
});

// 第二个成功回调
myPromise.then((value) => {
  console.log("Second then:", value);
});

// 第三个成功回调
myPromise.then((value) => {
  console.log("Third then:", value);
});
