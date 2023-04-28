// 简单实现
function debounce(fn, delay) {
  let timer = null;
  return function () {
    // 这里需要普通形式的函数来得到参数对象
    clearTimeout(timer); // 每次都先清除，这样只要没到delay的间隔，就不会触发函数
    timer = setTimeout(() => {
      fn.apply(this, arguments); // 注意this的指向
    }, delay);
  };
}
