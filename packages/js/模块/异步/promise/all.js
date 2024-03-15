const Task = function (result, isSuccess = true) {
  return () =>
    new Promise((resolve, reject) => {
      setTimeout(() => {
        if (isSuccess) {
          resolve(result);
        } else {
          reject(result);
        }
      }, 1000);
    });
};

Promise.all([Task("A"), Task("B"), Task("C", false), Task("D")]).then(
  (resultList) => {
    // do something
    resultList.forEach((result) => {
      result()
        .then((res) => {
          console.log(res);
        })
        .catch((err) => {
          console.log(err);
        });
    });
  }
);
