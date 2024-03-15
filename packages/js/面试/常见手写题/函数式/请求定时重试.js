// 主要的思路就是通过 Promise 来实现异步的控制
// 用递归 + 定时器来实现重试
function get(url, retries, interval) {
  return new Promise((resolve, reject) => {
    fetch(url)
      .then((response) => {
        if (response.ok) {
          resolve(response);
        } else {
          throw new Error("the response is not ok");
        }
      })
      .catch((error) => {
        console.error(`Error fetching ${url}:`, error);
        if (retries === 0) {
          reject(error); // 将结果抛到最外层
        } else {
          // 调用定时器重试
          setTimeout(() => {
            // 这里还需要把resolve 和 reject 传递到下一个递归，以传回需要的结果
            get(url, retries - 1, interval).then(resolve, reject);
          }, interval);
        }
      });
  });
}

get("www.baidu.com", 3, 1000)
  .then((res) => {
    console.log("res", res);
  })
  .catch((err) => {
    console.log("err", err);
  });
