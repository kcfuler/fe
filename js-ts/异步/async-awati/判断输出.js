async function foo() {
  console.log("foo");
}

async function bar() {
  console.log("bar start");
  await foo();
  console.log("bar end");
}

console.log("script start");

setTimeout(() => {
  console.log("setTimeout");
}, 0);

bar();

new Promise((resolve, reject) => {
  console.log("promise executor");
  resolve();
}).then(() => {
  console.log("promise then");
});

console.log("script end");

//test: script start | script end | bar start | foo              | bar end    | promise executor | promise then | setTimeout
//ans : script start | bar start  | foo       | promise executor | script end | bar end          | promise then | setTimeout
// think : 1.await后面的任务会推入微任务队列
//         2.创建 Promise 时执行的逻辑是主线程的逻辑
