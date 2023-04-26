// 通过柯里化将函数参数暂存到一个高阶函数中，提高函数的复用程度
function partial(fn, ...presetArgs) {
  return function (...restArgs) {
    let allArgs = presetArgs.concat(restArgs);
    return fn.apply(this, allArgs);
  };
}

function test(a, b, c, d) {
  console.log(a, b, c, d);
}

let testP = partial(test, 10, 15, 20);
testP(10);
