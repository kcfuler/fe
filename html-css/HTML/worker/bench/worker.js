const {
  Worker,
  isMainThread,
  parentPort,
  workerData,
} = require("worker_threads");
const os = require("os");

function calculatePi(start, end) {
  let sum = 0;
  for (let i = start; i < end; i++) {
    sum += Math.pow(-1, i) / (2 * i + 1);
  }
  return sum * 4;
}

function runWithThreads(numThreads) {
  return new Promise((resolve) => {
    const iterations = 1000000000;
    const threadsCompleted = { count: 0 };
    let result = 0;

    for (let i = 0; i < numThreads; i++) {
      const worker = new Worker(__filename, {
        workerData: {
          start: Math.floor(iterations / numThreads) * i,
          end: Math.floor(iterations / numThreads) * (i + 1),
        },
      });

      worker.on("message", (partialResult) => {
        result += partialResult;
        threadsCompleted.count++;
        if (threadsCompleted.count === numThreads) {
          resolve(result);
        }
      });
    }
  });
}

if (isMainThread) {
  const numCPUs = os.cpus().length;

  async function test() {
    console.log(`Testing with up to ${numCPUs} threads:`);
    for (let threads = 1; threads <= numCPUs; threads++) {
      const start = performance.now();
      await runWithThreads(threads);
      const end = performance.now();
      console.log(`Threads: ${threads}, Time: ${(end - start).toFixed(2)}ms`);
    }
  }

  test();
} else {
  const { start, end } = workerData;
  const partialResult = calculatePi(start, end);
  parentPort.postMessage(partialResult);
}
