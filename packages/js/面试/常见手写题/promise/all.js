function all(promises) {
  if (!Array.isArray(promises)) {
    throw new TypeError("promises must be an array");
  }
  return new Promise((resolve, reject) => {
    let promiseLength = promises.length;
    let result = new Array(promiseLength);
    let count = 0;
    for (let i = 0; i < promiseLength; i++) {
      Promise.resolve(promises[i]).then(
        (res) => {
          count++;
          result[i] = res;
          if (count === promiseLength) {
            resolve(result);
          }
        },
        (err) => {
          reject(err);
        }
      );
    }
  });
}

// test
let p1 = new Promise((resolve, reject) => {
  setTimeout(() => {
    resolve(1);
  }, 1000);
});
let p2 = new Promise((resolve, reject) => {
  setTimeout(() => {
    resolve(2);
  }, 2000);
});
let p3 = new Promise((resolve, reject) => {
  setTimeout(() => {
    resolve(3);
  }, 3000);
});
all([p1, p2, p3]).then((res) => {
  console.log(res);
});
