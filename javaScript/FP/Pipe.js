function pipe(...fns){
  // v 是传入的初始值
  return function piped(v) {
    return fns.reduce(function reducer(v, fn) {
      return fn(v);
    }, v);
  }
}

// 和 pipe 只是顺序相反
function compose(...fns) {
  return pipe(...fns.reverse());
}
