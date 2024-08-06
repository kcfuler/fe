// worker.js
self.onmessage = function (e) {
  const { buffer, index } = e.data;
  const sharedArray = new Int32Array(buffer);

  // 模拟一些计算
  let sum = 0;
  for (let i = 0; i < 1000000; i++) {
    sum += i;
  }

  // 原子地将结果添加到共享数组
  Atomics.add(sharedArray, 0, sum);

  self.postMessage("done");
};
