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

function runTests(deepClone) {
  // 测试用例 1: 复杂嵌套对象
  const test1 = {
    a: 1,
    b: {
      c: 2,
      d: [3, 4, { e: 5 }],
    },
    f: new Date(),
    g: /test/gi,
    h: new Map([
      ["key", "value"],
      ["obj", { nested: true }],
    ]),
    i: new Set([1, 2, { nested: true }]),
  };

  // 测试用例 2: 循环引用
  const test2 = { a: 1 };
  test2.b = test2;

  // 测试用例 3: 包含函数的对象
  const test3 = {
    a: function () {
      return 1;
    },
    b: {
      c: (x) => x * 2,
    },
  };

  // 测试用例 4: 原型链
  function CustomObject() {}
  CustomObject.prototype.testMethod = function () {};
  const test4 = new CustomObject();
  test4.a = 1;

  // 测试用例 5: Symbol 键
  const symbol = Symbol("test");
  const test5 = {
    [symbol]: "symbol value",
    normalKey: "normal value",
  };

  // 测试用例 6: 不可枚举属性
  const test6 = {};
  Object.defineProperty(test6, "nonEnumerable", {
    value: "hidden",
    enumerable: false,
  });

  // 测试用例 7: 复杂的 Map 和 Set
  const complexObj = { nested: true };
  const test7 = new Map([
    ["key1", "value1"],
    ["key2", complexObj],
    ["key3", new Set([1, 2, complexObj])],
  ]);

  // 运行测试
  function runTest(testCase, name) {
    console.log(`Running test: ${name}`);
    const cloned = deepClone(testCase);
    console.log("Original:", testCase);
    console.log("Cloned:", cloned);
    console.log(
      "Is deeply equal:",
      JSON.stringify(testCase) === JSON.stringify(cloned)
    );
    console.log("Is different object:", testCase !== cloned);
    console.log("------------------------");
  }

  runTest(test1, "Complex Nested Object");
  // runTest(test2, "Circular Reference");
  runTest(test3, "Object with Functions");
  runTest(test4, "Object with Prototype");
  runTest(test5, "Object with Symbol Keys");
  runTest(test6, "Object with Non-enumerable Properties");
  runTest(test7, "Complex Map and Set");
}

// 使用方法
runTests(deepClone);
