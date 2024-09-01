const curry = (fn) => {
  function curryInner(...params) {
    if (params.length < fn.length) {
      return function (...args) {
        return curryInner(...params, ...args);
      };
    } else {
      return fn.apply(this, params);
    }
  }
};

// 不是递归，更像状态机
curry.placeholder = Symbol();
const curryWithPlaceHolder = (fn) => {
  return function curryInner(...params) {
    if (params.length < fn.length || params.includes(curry.placeholder)) {
      return function (...args) {
        params = params.map((item) => {
          if (item === curry.placeholder) {
            return args.shift(); // 使用后面的参数来填充 params
          } else {
            return item;
          }
        });

        return curryInner(...params, ...args);
      };
    } else {
      return fn.apply(this, params);
    }
  };
};
