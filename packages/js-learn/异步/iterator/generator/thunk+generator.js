function thunk(fn) {
  return (...args) => {
    return (callback) => {
      return fn.call(this, args, callback);
    };
  };
}

function run(fn) {
  let gen = fn();

  if (gen.next) {
    let result = gen.next();
    if (result.done) return;
    result.value(next);
  }
  next();
}
