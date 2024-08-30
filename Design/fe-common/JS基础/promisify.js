function promisify(func) {
  return function (...args) {
    return new Promise((resolve, reject) => {
      // 这里的回调的格式主要来自node
      func.call(this, ...args, (err, data) => {
        if (err) {
          reject(err);
        } else {
          resolve(data);
        }
      });
    });
  };
}
