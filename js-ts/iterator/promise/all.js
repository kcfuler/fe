// 报错
const p1 = new Promise((resolve, reject) => {
  resolve("hello");
})
  .then((result) => result)
  .catch((err) => err);

const p2 = new Promise((resolve, reject) => {
  reject("P2 reject!");
}).then((res) => res);

const p3 = new Promise((resolve, reject) => {
  reject("P3 also reject !");
});

// Promise.all([p1, p2, p3])
//   .then((result) => console.log("result: ", result)) // ["hello", Error: 报错了]
//   .catch((err) => console.log(err));

Promise.all([p1, p2, p3])
  .then((res, rej) => {
    console.log("res", res);
    console.log("rej", rej);
  })
  .catch((err) => {
    console.log(err);
  });
