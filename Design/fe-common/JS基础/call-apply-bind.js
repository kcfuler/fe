function call(obj, ...args) {
  const key = Symbol("key");
  obj[key] = this;
  const result = obj[key](...args);
  delete obj[key];
  return result;
}

function apply(obj, args) {
  const key = Symbol("key");
  obj[key] = this;
  const result = obj[key](args);
  delete obj[key];
  return result;
}

/*
 * 本质上也是一种柯里化
 * */
function bind(obj, ...args) {
  const func = this;
  return function (...innerArgs) {
    func.apply(this, [...args, ...innerArgs]);
  };
}
