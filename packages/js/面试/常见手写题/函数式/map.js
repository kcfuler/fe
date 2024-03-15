Array.prototype.myMap = function (fn, thisValue) {
  let res = [];
  thisValue = thisValue || [];
  let arr = this; // 得到调用这个方法的数组
  for (let i = 0; i < arr.length; i++) {
    res.push(fn.call(thisValue, arr[i], i, arr)); // 能够得到四个参数 this value index array
  }
  return res;
};

// 使用
const a = [1, 2, 3];
const b = a.myMap((a, index) => {
  return a + 1;
});
console.log(b); // 输出 [2, 3, 4]
