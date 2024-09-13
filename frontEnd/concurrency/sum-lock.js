const buffer = new SharedArrayBuffer(4);
const lock = new Int32Array(buffer);

function acquireLock() {
  if (Atomics.compareExchange(lock, 0, 0, 1) !== 0) {
    Atomics.wait(lock, 0, 1);
    return acquireLock();
  }
}

function releaseLock() {
  Atomics.store(lock, 0, 0);
  Atomics.notify(lock, 0, 1);
}

// 使用锁
acquireLock();
try {
  // 临界区代码
} finally {
  releaseLock();
}
