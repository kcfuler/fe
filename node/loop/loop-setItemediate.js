setTimeout(function timeout() {
  console.log("timeout");
}, 0);
setImmediate(function immediate() {
  console.log("immediate");
});

// 1. setImmediate() 与 setTimeout() 的区别,当两者都在文件读写阶段时，setImmediate() 的优先级更高
const fs = require("fs");
fs.readFile(__filename, () => {
  setTimeout(() => {
    console.log("timeout");
  }, 0);
  setImmediate(() => {
    console.log("immediate");
  });
});
// immediate
// timeout
