// 执行 generator 的函数
function run(generatorFunc) {
  // 创建生成器对象
  const gen = generatorFunc();

  // 返回一个 promise，确保整个过程是异步的
  return new Promise((resolve, reject) => {
    // 执行器函数，用于递归处理生成器
    function step(nextFunc, arg) {
      let result;
      try {
        // 执行生成器的 next 或 throw 方法
        result = nextFunc.call(gen, arg);
      } catch (error) {
        // 如果执行出错，调用 reject 终止 promise
        return reject(error);
      }

      // 判断生成器是否完成
      if (result.done) {
        // 如果完成，调用 resolve 返回最终值
        return resolve(result.value);
      }

      // 如果未完成，继续处理 promise
      Promise.resolve(result.value).then(
        // 处理成功的情况，递归调用 step
        (val) => step(gen.next, val),
        // 处理失败的情况，递归调用 step
        (err) => step(gen.throw, err)
      );
    }

    // 初始调用 step，开始执行生成器
    step(gen.next);
  });
}

// 示例 async 函数
function* asyncGenerator() {
  try {
    const result1 = yield new Promise((resolve) =>
      setTimeout(() => resolve(1), 1000)
    );
    console.log(result1); // 输出 1
    const result2 = yield new Promise((resolve) =>
      setTimeout(() => resolve(2), 1000)
    );
    console.log(result2); // 输出 2
    return result1 + result2;
  } catch (error) {
    console.error("Error caught:", error);
  }
}

// 使用 run 执行 asyncGenerator
run(asyncGenerator).then((result) => {
  console.log("Final result:", result); // 输出 Final result: 3
});
