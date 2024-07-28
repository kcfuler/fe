function asyncFunc() {
  spawn(function* () {});
}

/**
 * 精妙之处：
 * 1. generator机制
 *  - next
 *  - throw
 *  - done
 *  - value
 * 2. 递归迭代 gen 函数
 * 3. 使用promise控制执行流（正常流、错误流）
 */
function spawn(genF) {
  return new Promise((resolve, reject) => {
    const gen = genF();

    // 递归的方式迭代执行 gen ，直到结束
    const step = (nextF) => {
      let next;
      try {
        next = nextF();
      } catch (e) {
        return reject(e);
      }

      if (next.done) {
        return resolve(next.value);
      }

      Promise.resolve(next.value).then(
        (v) => step(() => gen.next(v)),
        (e) => step(() => gen.throw(e))
      );
    };

    step(() => gen.next(undefined));
  });
}

// 测试用例
console.log("开始测试异步执行器...");

// 测试1: 简单异步函数
spawn(function* () {
  const result = yield Promise.resolve(42);
  console.log("测试1 - 简单异步函数:", result === 42 ? "通过" : "失败");
}).catch((error) => console.error("测试1失败:", error));

// 测试2: 多个yield
spawn(function* () {
  const a = yield Promise.resolve(10);
  const b = yield Promise.resolve(20);
  const result = a + b;
  console.log("测试2 - 多个yield:", result === 30 ? "通过" : "失败");
}).catch((error) => console.error("测试2失败:", error));

// 测试3: 错误处理
spawn(function* () {
  yield Promise.resolve(10);
  throw new Error("测试错误");
}).then(
  () => console.log("测试3 - 错误处理: 失败（未捕获到错误）"),
  (error) =>
    console.log(
      "测试3 - 错误处理:",
      error.message === "测试错误" ? "通过" : "失败"
    )
);

// 测试4: 嵌套Promise
spawn(function* () {
  const result = yield Promise.resolve(Promise.resolve(100));
  console.log("测试4 - 嵌套Promise:", result === 100 ? "通过" : "失败");
}).catch((error) => console.error("测试4失败:", error));

// 测试5: 空生成器函数
spawn(function* () {})
  .then((result) => {
    console.log(
      "测试5 - 空生成器函数:",
      result === undefined ? "通过" : "失败"
    );
  })
  .catch((error) => console.error("测试5失败:", error));

// 测试6: yield中的异步函数
const delay = (ms) => new Promise((resolve) => setTimeout(resolve, ms));

spawn(function* () {
  yield delay(100);
  console.log("测试6 - yield中的异步函数: 通过");
}).catch((error) => console.error("测试6失败:", error));

// 测试7: Promise拒绝的错误传播
spawn(function* () {
  yield Promise.reject(new Error("被拒绝的Promise"));
}).then(
  () => console.log("测试7 - Promise拒绝: 失败（未捕获到错误）"),
  (error) =>
    console.log(
      "测试7 - Promise拒绝:",
      error.message === "被拒绝的Promise" ? "通过" : "失败"
    )
);

console.log("所有测试已启动，请等待异步测试完成...");
