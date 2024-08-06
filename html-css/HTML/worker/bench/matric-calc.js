const {
  Worker,
  isMainThread,
  parentPort,
  workerData,
} = require("worker_threads");
const os = require("os");

function multiplyMatrices(a, b, startRow, endRow) {
  const result = [];
  for (let i = startRow; i < endRow; i++) {
    result[i - startRow] = [];
    for (let j = 0; j < b[0].length; j++) {
      let sum = 0;
      for (let k = 0; k < a[0].length; k++) {
        sum += a[i][k] * b[k][j];
      }
      result[i - startRow][j] = sum;
    }
  }
  return result;
}

function runTask(threadCount) {
  return new Promise((resolve) => {
    const size = 2000;
    const a = Array(size)
      .fill()
      .map(() =>
        Array(size)
          .fill()
          .map(() => Math.random())
      );
    const b = Array(size)
      .fill()
      .map(() =>
        Array(size)
          .fill()
          .map(() => Math.random())
      );

    const chunkSize = Math.ceil(size / threadCount);
    const workers = [];
    let completedWorkers = 0;
    const result = new Array(size).fill().map(() => new Array(size));

    for (let i = 0; i < threadCount; i++) {
      const start = i * chunkSize;
      const end = Math.min((i + 1) * chunkSize, size);
      const worker = new Worker(__filename, {
        workerData: { a, b, start, end },
      });

      worker.on("message", (partialResult) => {
        for (let j = start; j < end; j++) {
          result[j] = partialResult[j - start];
        }
        completedWorkers++;
        if (completedWorkers === threadCount) {
          resolve(result);
        }
      });

      workers.push(worker);
    }
  });
}

async function benchmarkTask(maxThreads) {
  console.log("矩阵乘法 (2000x2000) 性能测试：");
  for (let threads = 1; threads <= maxThreads; threads++) {
    const start = performance.now();
    await runTask(threads);
    const end = performance.now();
    console.log(`线程数: ${threads}, 耗时: ${(end - start).toFixed(2)}ms`);
  }
}

if (isMainThread) {
  const maxThreads = os.cpus().length;
  benchmarkTask(maxThreads);
} else {
  const { a, b, start, end } = workerData;
  const partialResult = multiplyMatrices(a, b, start, end);
  parentPort.postMessage(partialResult);
}
