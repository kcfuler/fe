function throttle(f, delay) {
  let timer = null;
  return function (...args) {
    if (timer) {
      return;
    }
    timer = setTimeout(() => {
      f.apply(this, args);
      timer = null;
    }, delay);
  };
}
