function promiseAllSettled(promises) {
  if (!Array.isArray(promises)) {
    throw new TypeError("promises must be an array");
  }

  return new Promise((resolve, reject) => {
    const len = promises.length;
    const result = new Array(len);
    let count = 0;

    for (let i = 0; i < len; i++) {
      Promise.resolve(promises[i]).then(
        (res) => {
          count++;
          result[i] = res;
          if (count === len) {
            resolve(result);
          }
        },
        (rej) => {
          count++;
          result[i] = rej;
          if (count === len) {
            resolve(result);
          }
        }
      );
    }
  });
}
