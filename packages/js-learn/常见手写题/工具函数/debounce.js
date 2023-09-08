// 简单实现
function debounce(fn, delay) {
  let timer = null;
  return (...args) => {
    clearTimeout(timer); // 每次都先清除，这样只要没到delay的间隔，就不会触发函数
    timer = setTimeout(() => {
      fn(...args);
    }, delay);
  };
}
