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
function bind(obj, ...args) {
  const func = this;
  return function (...innerArgs) {
    func.apply(this, [...args, ...innerArgs]);
  };
}
