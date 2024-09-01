function deepClone(target, map = new WeakMap()) {
  // 处理原始类型和函数
  if (
    typeof target !== "object" ||
    target === null ||
    typeof target === "function"
  ) {
    return target;
  }

  // 处理特殊对象类型
  const specialTypes = {
    Date: (v) => new Date(v.getTime()),
    RegExp: (v) => new RegExp(v.source, v.flags),
    Map: (v, m) =>
      new Map(Array.from(v, ([key, val]) => [key, deepClone(val, m)])),
    Set: (v, m) => new Set(Array.from(v, (val) => deepClone(val, m))),
    ArrayBuffer: (v) => v.slice(),
  };

  const constructorName = target.constructor.name;
  if (specialTypes.hasOwnProperty(constructorName)) {
    return specialTypes[constructorName](target, map);
  }

  // 处理数组和普通对象
  const cloneTarget = Array.isArray(target) ? [] : {};

  // 处理循环引用
  if (map.has(target)) {
    return map.get(target);
  }
  map.set(target, cloneTarget);

  // 处理所有键，包括 Symbol 和不可枚举属性
  Reflect.ownKeys(target).forEach((key) => {
    const desc = Reflect.getOwnPropertyDescriptor(target, key);
    Reflect.defineProperty(cloneTarget, key, {
      configurable: desc.configurable,
      enumerable: desc.enumerable,
      writable: desc.writable,
      value: deepClone(desc.value, map),
    });
  });

  // 保持原型链
  Object.setPrototypeOf(cloneTarget, Object.getPrototypeOf(target));

  return cloneTarget;
}
