const thenable = {
  then(resolve, reject) {
    reject("Error");
  },
};

/*
Promise.reject 方法的参数是一个 thenable 对象，
执行以后，后面 catch 方法的参数不是 reject 抛出的 Error 这个字符串，而是 thenable 对象。
*/

Promise.reject(thenable).catch((e) => {
  console.log(e === thenable); // true
});
