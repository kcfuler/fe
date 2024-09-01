function debounce(fn, wait, { leading = false, trailing = true }) {
  let timer = null;

  return function (...args) {
    let isInvoked = false;
    if (timer) {
      clearTimeout(timer);
    } else if (leading) {
      fn.apply(this, args);
      isInvoked = true;
    }
    timer = setTimeout(() => {
      if (trailing && !isInvoked) {
        fn.apply(this, args);
      }
      timer = null;
    }, wait);
  };
}
