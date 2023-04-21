// var p1 = new Promise((resolve, reject) => {
//   setTimeout(resolve, 1000, "one");
// });

// var p2 = new Promise((resolve, reject) => {
//   setTimeout(resolve, 2000, "two");
// });

// var p3 = new Promise((resolve, reject) => {
//   setTimeout(resolve, 3000, "three");
// });

// var p4 = new Promise((resolve, reject) => {
//   setTimeout(resolve, 4000, "four");
// });

var p5 = new Promise((resolve, reject) => {
  reject("reject");
});

// 返回第一个成功的promise
// Promise.any([p1, p2, p3, p4, p5])
//   .then((res) => {
//     console.log(res);
//   })
//   .catch((rej) => {
//     console.log(rej);
//   });

// 没有成功的，返回 AggregateError: All promises were rejected
Promise.any([p5])
  .then((res) => {
    console.log("res", res);
  })
  .catch((rej) => {
    console.log("rej", rej);
  });
