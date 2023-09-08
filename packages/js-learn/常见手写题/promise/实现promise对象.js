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
    return new MyPromise((resolve, reject) => {
      if (this.state === FULFILLED) {
        try {
          const x = onFulfilled(this.value);
          resolve(x);
        } catch(err) {
          reject(err);
        }
      }

      if (this.state === REJECTED) {
        try {
          const x = onRejected(this.reason);
          resolve(x);
        } catch(err) {
          reject(err);
        }
      }

      if (this.state === PENDING) {
        this.onFulfilledCallbacks.push(() => {
          try {
            const x = onFulfilled(this.value);
            resolve(x);
          } catch(err) {
            reject(err);
          }
        });

        this.onRejectedCallbacks.push(() => {
          try {
            const x = onRejected(this.reason);
            resolve(x);
          } catch(err) {
            reject(err);
          }
        });
      }
    })

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

console.log('second test -------------------');
console.log('');

new MyPromise((resolve, reject) => {
  resolve(1);
})
.then(result => {
  console.log(result);  // 输出 1
  return result + 1;
})
.then(result => {
  console.log(result);  // 输出 2
  return result + 1;
})
.then(result => {
  console.log(result);  // 输出 3
});
