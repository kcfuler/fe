// 原生的实现
// const xhr = new XMLHttpRequest();
// xhr.open("GET", "https://jsonplaceholder.typicode.com/users");
// xhr.send();

// xhr.abort();

// 封装
const fetchAbort = (url) => {
  let res, abort, xhr;
  const xhrPromise = new Promise((resolve, reject) => {
    xhr = new XMLHttpRequest();
    xhr.onreadystatechange = function () {
      if (xhr.readyState === 4) {
        if (this.status == 200) {
          return resolve(this.response);
        }
        return reject({
          xhr: this,
          msg: "Error",
          status: this.status,
          statusText: this.statusText,
        });
      }
    };
    xhr.open("Get", url);
    xhr.send();
  });
  const abortPromise = new Promise((resolve, reject) => {
    res = resolve;
    abort = () => {
      xhr.abort();
      return reject(`Fetch "${url}" has been aborted`);
    };
  });
  return {
    response: Promise.race([xhrPromise.then((ret) => res(ret)), abortPromise]),
    abort,
  };
};
const { response, abort } = fetchAbort("./serverConfig.json");
abort();
response
  .then((ret) => console.log(ret))
  .catch((err) => {
    console.log(err);
  });
