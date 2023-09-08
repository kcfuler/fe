function throttle(func, delay) {
  let timer = null;

  return (...args) => {
    if (!timer) {
      timer = setTimeout(() => {
        func(...args);
        timer = null;
      }, delay);
    }
  };
}
