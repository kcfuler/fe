// 1.0， 使用闭包辅助完成
let arr = [];
function sumCurry(...args) {
  arr = arr.concat(args);
  if (args.length === 0) {
    return arr.reduce((prev, cur) => prev + cur, 0);
  } else {
    return sumCurry;
  }
}

// console.log(sumCurry(1)(2)(3)());

// 1.1，加一层函数包裹，第一层由最外层的函数接收，其它由内部的函数处理
function sumCurry1(...argsOut) {
  let arr = [...argsOut];
  let fn = (...argsInner) => {
    if (argsInner.length === 0) {
      return arr.reduce((prev, cur) => prev + cur, 0);
    } else {
      arr = arr.concat(argsInner);
      return fn;
    }
  };
  return fn;
}
console.log("sumCurry1", sumCurry1(1)(2)(3)());
// console.log(sumCurry1(1));
