setImmediate(() => {
  console.log("immediate");
});

setTimeout(() => {
  console.log("timeout1");
}, 0);

setTimeout(() => {
  console.log("timeout2");
}, 0);

setTimeout(() => {
  console.log("timeout3");
});
