// main.js
const { Worker, isMainThread, parentPort } = require("worker_threads");

const buffer = new SharedArrayBuffer(4 * 4); // 4 个 32 位整数
const sharedArray = new Int32Array(buffer);
const numWorkers = 4;
let completedWorkers = 0;

for (let i = 0; i < numWorkers; i++) {
  const worker = new Worker("worker.js");
  worker.postMessage({ buffer, index: i });
  worker.onmessage = () => {
    completedWorkers++;
    if (completedWorkers === numWorkers) {
      console.log("Final sum:", sharedArray[0]);
    }
  };
}
