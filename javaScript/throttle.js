function throttle(fn, delay) {
  let open = true;
  return function () {
    if (open) {
      setTimeout(() => {
        fn.apply(this, arguments);
        open = true; // 函数执行完成之后才会开始打开阀门
      }, delay);
      open = false;
    } else {
      return false;
    }
  };
}
