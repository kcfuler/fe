// 测试 BigInt vs Array 在存储大量状态时的内存占用

function measureMemoryBigInt(size) {
  // 创建一个表示 2^size - 1 的 BigInt (所有低位都是1)
  const before = process.memoryUsage().heapUsed;
  const num = (1n << BigInt(size)) - 1n;
  const after = process.memoryUsage().heapUsed;
  return after - before;
}

function measureMemoryArray(size) {
  // 创建一个长度为 size 的数组，所有元素都是 true
  const before = process.memoryUsage().heapUsed;
  const arr = new Array(size).fill(true);
  const after = process.memoryUsage().heapUsed;
  return after - before;
}

function measureMemoryTypedArray(size) {
  // 使用类型化数组 Uint8Array
  const before = process.memoryUsage().heapUsed;
  const bits = new Uint8Array(Math.ceil(size / 8));
  for (let i = 0; i < size; i++) {
    const byteIndex = Math.floor(i / 8);
    const bitIndex = i % 8;
    bits[byteIndex] |= 1 << bitIndex;
  }
  const after = process.memoryUsage().heapUsed;
  return after - before;
}

// 测试不同大小的内存占用
function runTest() {
  const sizes = [1e3, 1e4, 1e5, 1e6, 1e7];

  console.log("Memory usage (in bytes):");
  console.log("Size\t\tBigInt\t\tArray\t\tTypedArray");
  console.log("-".repeat(60));

  for (const size of sizes) {
    const bigIntMem = measureMemoryBigInt(size);
    const arrayMem = measureMemoryArray(size);
    const typedArrayMem = measureMemoryTypedArray(size);

    console.log(
      `${size.toExponential(0)}\t\t` +
        `${Math.round(bigIntMem).toLocaleString()}\t\t` +
        `${Math.round(arrayMem).toLocaleString()}\t\t` +
        `${Math.round(typedArrayMem).toLocaleString()}`
    );
  }
}

runTest();
