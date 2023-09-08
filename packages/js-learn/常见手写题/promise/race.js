function race(promises) {
  if (!Array.isArray(promises)) {
    throw new TypeError("promises must be an array");
  }
  return new Promise((resolve, reject) => {
    for (let i = 0; i < promises.length; i++) {
      Promise.resolve(promises[i]).then(
        (res) => {
          resolve(res);
        },
        (err) => {
          reject(err);
        }
      );
    }
  });
}
