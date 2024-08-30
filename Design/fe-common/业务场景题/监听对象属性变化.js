function getProxy(obj, path) {
  return new Proxy(obj, {
    set(target, prop, newVal) {
      console.log(
        "path -> ",
        [...path, prop].join("."),
        `oldVal: ${target[prop]} -> newVal: ${newVal}`
      );
      return Reflect.set(target, prop, newVal);
    },
  });
}

function isNonNestedObject(obj) {
  if (typeof obj !== "object" || obj === null) {
    return false;
  }
  return Object.values(obj).every(
    (val) => typeof val !== "object" || val === null
  );
}

function logObj(obj) {
  const dfs = (temp, path = []) => {
    if (!isNonNestedObject(temp)) {
      for (const key of Object.keys(temp)) {
        temp[key] = dfs(temp[key], [...path, key]);
      }
    }
    return getProxy(temp, path);
  };

  return dfs(obj);
}

const obj1 = {
  a: "11",
  b: "22",
  c: {
    d: 22,
    e: [1, 2, 3],
  },
};

const p1 = logObj(obj1);
p1.c.e[1] = "3";
