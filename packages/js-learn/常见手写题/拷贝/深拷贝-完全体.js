function _completeDeepClone(target, map) {
  if (typeof target !== "object" || target === null) {
    return target;
  }
  const constructor = target.constructor;
  if (/^(Function|RegExp|Date|Map|Set)$/i.test(constructor.name)) {
    return new constructor(target);
  }
  if (map.has(target)) {
    return map.get(target);
  }
  map.set(target, true);
  const result = Array.isArray(target) ? [] : {};
  for (let key in target) {
    if (target.hasOwnProperty(key)) {
      result[key] = _completeDeepClone(target[key], map);
    }
  }
  return result;
}

const date = new Date();
const testObj = {
  a: 1,
  b: 2,
  c: date,
};

console.log(_completeDeepClone(testObj, new Map()));
