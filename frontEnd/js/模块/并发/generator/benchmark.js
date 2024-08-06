// const fetch = require("node-fetch");
import fetch from "node-fetch";

// 生成器版本
function* fetchDataGen(url) {
  const response = yield fetch(url);
  const data = yield response.json();
  return data;
}

function runGenerator(generatorFunc) {
  const generator = generatorFunc();
  function handle(result) {
    if (result.done) return Promise.resolve(result.value);
    return Promise.resolve(result.value).then(
      (res) => handle(generator.next(res)),
      (err) => handle(generator.throw(err))
    );
  }
  return handle(generator.next());
}

// Async/Await 版本
async function fetchDataAsync(url) {
  const response = await fetch(url);
  const data = await response.json();
  return data;
}

// 测试函数
async function runTest(testFunc, name, count) {
  console.time(name);
  try {
    await Promise.all(
      Array(count)
        .fill()
        .map(() => testFunc("https://jsonplaceholder.typicode.com/todos/1"))
    );
    console.timeEnd(name);
  } catch (error) {
    console.error(`Error in ${name}:`, error);
  }
}

// 主测试函数
async function main() {
  const testCounts = [10, 100, 1000];

  for (const count of testCounts) {
    console.log(`\nTesting with ${count} concurrent requests:`);

    // 生成器测试
    await runTest(
      (url) => runGenerator(fetchDataGen.bind(null, url)),
      `Generator (${count} requests)`,
      count
    );

    // Async/Await 测试
    await runTest(fetchDataAsync, `Async/Await (${count} requests)`, count);
  }
}

// 运行测试
main().catch(console.error);
