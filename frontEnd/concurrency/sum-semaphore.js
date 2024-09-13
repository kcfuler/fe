const {
  Worker,
  isMainThread,
  parentPort,
  workerData,
} = require("worker_threads");
const { performance } = require("perf_hooks");

const NUM_WORKERS = 4;
const INCREMENTS_PER_WORKER = 100000;
const SEMAPHORE_COUNT = 2; // 允许同时访问的线程数

class Semaphore {
  constructor(count, buffer, index) {
    this.count = new Int32Array(buffer, index * 4, 1);
    Atomics.store(this.count, 0, count);
  }

  acquire() {
    while (true) {
      const oldCount = Atomics.load(this.count, 0);
      if (oldCount > 0) {
        const newCount = Atomics.compareExchange(
          this.count,
          0,
          oldCount,
          oldCount - 1
        );
        /**
         * 在我们检查和更新计数的过程中，没有其他线程干扰这个操作。
         * 我们成功地将计数减少了 1。
         * 我们实际上获得了信号量的一个"许可"。
         */
        if (newCount === oldCount) {
          return;
        }
      } else {
        Atomics.wait(this.count, 0, 0);
      }
    }
  }

  release() {
    Atomics.add(this.count, 0, 1);
    Atomics.notify(this.count, 0, 1);
  }
}

if (isMainThread) {
  runMain();
} else {
  runWorker();
}

function runMain() {
  console.log("Starting main thread");

  runWithoutSync()
    .then(() => {
      console.log("\n------------------------------\n");
      return runWithLock();
    })
    .then(() => {
      console.log("\n------------------------------\n");
      return runWithSemaphore();
    })
    .then(() => {
      console.log("All tests completed");
    });
}

async function runWithoutSync() {
  console.log("Running without synchronization:");
  const sharedBuffer = new SharedArrayBuffer(4);
  const counter = new Int32Array(sharedBuffer);

  const startTime = performance.now();
  await runWorkers(counter, "none");
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
  await runWorkers(counter, "lock");
  const endTime = performance.now();

  console.log(`Final counter value: ${counter[0]}`);
  console.log(`Expected value: ${NUM_WORKERS * INCREMENTS_PER_WORKER}`);
  console.log(`Execution time: ${(endTime - startTime).toFixed(2)} ms`);
}

async function runWithSemaphore() {
  console.log("Running with semaphore:");
  const sharedBuffer = new SharedArrayBuffer(12);
  const counter = new Int32Array(sharedBuffer);
  const semaphore = new Semaphore(SEMAPHORE_COUNT, sharedBuffer, 1);

  const startTime = performance.now();
  await runWorkers(counter, "semaphore");
  const endTime = performance.now();

  console.log(`Final counter value: ${counter[0]}`);
  console.log(`Expected value: ${NUM_WORKERS * INCREMENTS_PER_WORKER}`);
  console.log(`Execution time: ${(endTime - startTime).toFixed(2)} ms`);
}

function runWorkers(counter, syncType) {
  return new Promise((resolve) => {
    let completedWorkers = 0;
    for (let i = 0; i < NUM_WORKERS; i++) {
      const worker = new Worker(__filename, {
        workerData: {
          counter: counter.buffer,
          syncType,
          incrementsPerWorker: INCREMENTS_PER_WORKER,
          semaphoreCount: SEMAPHORE_COUNT,
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
  const {
    counter: counterBuffer,
    syncType,
    incrementsPerWorker,
    semaphoreCount,
  } = workerData;
  const counter = new Int32Array(counterBuffer);
  const lock = syncType === "lock" ? new Int32Array(counterBuffer, 4, 1) : null;
  const semaphore =
    syncType === "semaphore"
      ? new Semaphore(semaphoreCount, counterBuffer, 1)
      : null;

  const startTime = performance.now();

  for (let i = 0; i < incrementsPerWorker; i++) {
    if (syncType === "lock") {
      acquireLock(lock);
      try {
        counter[0]++;
      } finally {
        releaseLock(lock);
      }
    } else if (syncType === "semaphore") {
      semaphore.acquire();
      try {
        counter[0]++;
      } finally {
        semaphore.release();
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
