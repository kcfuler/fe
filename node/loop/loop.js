console.log("start");
setTimeout(() => {
  console.log("timer1");
  Promise.resolve().then(function () {
    console.log("promise1");
  });
}, 0);
setTimeout(() => {
  console.log("timer2");
  Promise.resolve().then(function () {
    console.log("promise2");
  });
}, 0);
// resolve 中的内容是同步执行的
Promise.resolve().then(function () {
  console.log("promise3");
});
console.log("end");
//start=>end=>promise3=>timer1=>timer2=>promise1=>promise2
