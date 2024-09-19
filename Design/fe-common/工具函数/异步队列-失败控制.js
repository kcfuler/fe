/**
 * JS实现一个异步加载器Loader，有如下要求：
 * - 加载JS并依次 eval 执行
 * - 没有并发数限制
 * - 加载是可以不按顺序的（因为有的返回早，有的返回晚），但需要按顺序 eval() 执行，被加载的JS内容是一次加载 1/2/3
 * - 由于网络不稳定，不能保证所有的JS都能一次性顺利加载完成，所以加载器需要进行重试，最多重试三次，每次重试之间间隔500ms
 *
 * update:
 *  1. 在保证执行顺序的前提下，先加载完成先执行
 *  2. 每个add函数返回一个promise，如果加载或者执行失败，reject，并给出错误原因
 */

class Loader {
  constructor(
    options = {
      retry: {
        max: 3,
        delay: 500,
      },
    }
  ) {
    this.options = options;
    this.tasks = [];
    this.results = [];
  }

  add(task) {
    this.tasks.push(task);
  }

  async load() {
    const {
      retry: { max, delay },
    } = this.options;
    const loadTask = async (task, index) => {
      for (let i = 0; i < max; i++) {
        try {
          const res = await task();
          this.results[index] = res;
          break;
        } catch (e) {
          if (i === max - 1) {
            console.error(`task ${index} failed after ${max} attempts: `, e);
            throw e;
          }
          // delay
          await new Promise((resolve) => setTimeout(resolve, delay));
        }
      }
    };

    try {
      await Promise.all(this.tasks.map(loadTask));
    } catch (e) {
      console.error("Some Tasks failed to load");
    }
  }

  async execute() {
    await this.load();
    this.results.forEach((code, index) => {
      if (code) {
        try {
          eval(code);
        } catch (e) {
          console.error(`Error executing task ${index}`, error);
        }
      } else {
        console.warn(`Task ${index} was not loaded successfully`);
      }
    });
  }
}

// 首先，导入我们的 Loader 类
// const Loader = require('./Loader');  // 如果使用 CommonJS
// import Loader from './Loader';       // 如果使用 ES6 模块

// 模拟异步加载函数
function mockAsyncLoad(content, delay, shouldFail = false) {
  return () =>
    new Promise((resolve, reject) => {
      setTimeout(() => {
        if (shouldFail) {
          reject(new Error("Load failed"));
        } else {
          resolve(content);
        }
      }, delay);
    });
}

// 测试用例
async function runTests() {
  console.log("Starting Loader tests...");

  // 测试用例 1: 基本功能测试
  async function testBasicFunctionality() {
    const loader = new Loader();
    loader.add(mockAsyncLoad("console.log('Task 1')", 100));
    loader.add(mockAsyncLoad("console.log('Task 2')", 50));
    loader.add(mockAsyncLoad("console.log('Task 3')", 150));

    await loader.execute();
    console.log("Basic functionality test completed");
  }

  // 测试用例 2: 重试机制测试
  async function testRetryMechanism() {
    const loader = new Loader({ retry: { max: 2, delay: 100 } });
    let attemptCount = 0;
    loader.add(
      () =>
        new Promise((resolve, reject) => {
          attemptCount++;
          if (attemptCount < 2) {
            reject(new Error("Simulated failure"));
          } else {
            resolve("console.log('Retry succeeded')");
          }
        })
    );

    await loader.execute();
    console.log(`Retry mechanism test completed. Attempts: ${attemptCount}`);
  }

  // 测试用例 3: 错误处理测试
  async function testErrorHandling() {
    const loader = new Loader();
    loader.add(mockAsyncLoad("console.log('Success')", 50));
    loader.add(mockAsyncLoad("This will cause an error", 100, true));
    loader.add(mockAsyncLoad("console.log('After error')", 150));

    await loader.execute();
    console.log("Error handling test completed");
  }

  // 测试用例 4: 执行顺序测试
  async function testExecutionOrder() {
    const loader = new Loader();
    const order = [];
    loader.add(mockAsyncLoad("order.push(1)", 150));
    loader.add(mockAsyncLoad("order.push(2)", 50));
    loader.add(mockAsyncLoad("order.push(3)", 100));

    await loader.execute();
    console.log("Execution order:", order);
    console.assert(
      JSON.stringify(order) === JSON.stringify([1, 2, 3]),
      "Execution order is correct"
    );
  }

  // 运行所有测试用例
  try {
    await testBasicFunctionality();
    await testRetryMechanism();
    await testErrorHandling();
    await testExecutionOrder();
    console.log("All tests completed successfully");
  } catch (error) {
    console.error("Test failed:", error);
  }
}

// 运行测试
runTests();
