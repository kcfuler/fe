const {
  Worker,
  isMainThread,
  parentPort,
  workerData,
} = require("worker_threads");
const { performance } = require("perf_hooks");

const NUM_WORKERS = 16;
const INCREMENTS_PER_WORKER = 100000;

if (isMainThread) {
  runMain();
} else {
  runWorker();
}

function runMain() {
  console.log("Starting main thread");

  runWithoutLock()
    .then(() => {
      console.log("\n------------------------------\n");
      return runWithLock();
    })
    .then(() => {
      console.log("All tests completed");
    });
}

async function runWithoutLock() {
  console.log("Running without lock:");
  const sharedBuffer = new SharedArrayBuffer(4);
  const counter = new Int32Array(sharedBuffer);

  const startTime = performance.now();
  await runWorkers(counter, false);
  const endTime = performance.now();

  console.log(`Final counter value: ${counter[0]}`);
  console.log(`Expected value: ${NUM_WORKERS * INCREMENTS_PER_WORKER}`);
  console.log(`Execution time: ${(endTime - startTime).toFixed(2)} ms`);
}

async function runWithLock() {
  console.log("Running with lock:");
  const sharedBuffer = new SharedArrayBuffer(8);
  const counter = new Int32Array(sharedBuffer);
  const lock = new Int32Array(sharedBuffer, 4, 1);

  const startTime = performance.now();
  await runWorkers(counter, true);
  const endTime = performance.now();

  console.log(`Final counter value: ${counter[0]}`);
  console.log(`Expected value: ${NUM_WORKERS * INCREMENTS_PER_WORKER}`);
  console.log(`Execution time: ${(endTime - startTime).toFixed(2)} ms`);
}

function runWorkers(counter, useLock) {
  return new Promise((resolve) => {
    let completedWorkers = 0;
    for (let i = 0; i < NUM_WORKERS; i++) {
      const worker = new Worker(__filename, {
        workerData: {
          counter: counter.buffer,
          useLock,
          incrementsPerWorker: INCREMENTS_PER_WORKER,
        },
      });

      worker.on("message", (message) => {
        console.log(
          `Worker ${i + 1} finished in ${message.duration.toFixed(2)} ms`
        );
        completedWorkers++;
        if (completedWorkers === NUM_WORKERS) {
          resolve();
        }
      });
    }
  });
}

function runWorker() {
  const { counter: counterBuffer, useLock, incrementsPerWorker } = workerData;
  const counter = new Int32Array(counterBuffer);
  const lock = useLock ? new Int32Array(counterBuffer, 4, 1) : null;

  const startTime = performance.now();

  for (let i = 0; i < incrementsPerWorker; i++) {
    if (useLock) {
      acquireLock(lock);
      try {
        counter[0]++;
      } finally {
        releaseLock(lock);
      }
    } else {
      counter[0]++;
    }
  }

  const endTime = performance.now();
  const duration = endTime - startTime;

  parentPort.postMessage({ status: "done", duration });
}

function acquireLock(lock) {
  while (Atomics.compareExchange(lock, 0, 0, 1) !== 0) {
    Atomics.wait(lock, 0, 1);
  }
}

function releaseLock(lock) {
  Atomics.store(lock, 0, 0);
  Atomics.notify(lock, 0, 1);
}
