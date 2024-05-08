function getProxy(obj, path) {
  const cloneObj = structuredClone(obj);
  const keyPath = path.join(".");

  return new Proxy(cloneObj, {
    set(target, prop, newVal) {
      console.log(
        "path -> ",
        keyPath,
        `oldVal: ${target[prop]} -> newVal: ${newVal}`
      );
      return Reflect.set(target, prop, newVal);
    },
  });
}

function isObj(target) {
  return typeof target === "object" && target !== null;
}

function notNestObj(obj) {
  for (const key of Object.keys(obj)) {
    const val = obj[key];
    if (typeof val === "object" && val !== null) {
      return false;
    }
  }

  return true;
}

// 核心在于区分嵌套对象和普通对象，然后分别处理即可
function logObj(obj) {
  const path = [];
  const newObj = getProxy(obj, path);

  // 注意返回值
  const dfs = (temp) => {
    if (!isObj(temp)) {
      return temp;
    }
    if (notNestObj(temp)) {
      return getProxy(temp, path);
    }

    for (const key of Object.keys(temp)) {
      path.push(key);
      temp[key] = dfs(temp[key]);
      path.pop();
    }

    return temp;
  };

  dfs(newObj);

  return newObj;
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
// p1.a = "22";
console.log(p1);
// p1.c.d = "3";
p1.c.e[1] = "3";
