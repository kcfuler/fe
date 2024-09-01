function throttle(fn, wait, { leading = false, trailing = true }) {
  let timer = null;
  let lastArgs = null;

  const run = () => {
    timer = null;
    if (trailing && lastArgs) {
      fn.apply(fn, lastArgs);
      timer = null;
      timer = setTimeout(run, wait);
    }
  };

  return function (...params) {
    if (!timer) {
      if (leading) {
        fn.apply(this, params);
      }

      timer = setTimeout(run, wait);
    } else {
      lastArgs = params;
    }
  };
}
