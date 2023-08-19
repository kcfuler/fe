function getData() {
  return new Promise((resolve, reject) => {
    fetch("https://jsonplaceholder.typicode.com/todos/1")
      .then((response) => response.json())
      .then((data) => resolve(data))
      .catch((error) => reject(error));
  });
}

function* main() {
  try {
    let res = yield getData(); // 使用yield移交控制权
    console.log(res);
  } catch (err) {
    console.log(err);
  }
}

let gen = main();
let promise = gen.next().value; //得到执行结果

promise
  .then((res) => {
    console.log(res);
  })
  .catch((err) => {
    console.log(err);
  });
