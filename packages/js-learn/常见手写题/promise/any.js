function promiseAny(promises) {
  if (!Array.isArray(promises)) {
    throw new TypeError("promises must be an array");
  }

  return new Promise((resolve, reject) => {
    let promiseLength = promises.length;
    let rejectedCount = 0;
    for (let i = 0; i < promiseLength; i++) {
      Promise.resolve(promises[i]).then(
        (res) => {
          resolve(res);
        },
        (err) => {
          rejectedCount++;
          if (rejectedCount === promiseLength) {
            reject(new AggregateError("All promises were rejected"));
          }
        }
      );
    }
  });
}
