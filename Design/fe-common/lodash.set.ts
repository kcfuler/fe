/**
 * 实现一个类似lodash.set的JS/TS方法，满足如下输出：
 * set({}, 'a.b.c', 123) // 输出{a:{b:{c:123}}}
 * set({e: 1}, 'a.b.c.d', 123) // 输出{e:1, a:{b:{c:{d:123}}}}
 *
 * 思路：
 *  迭代取值，逐层定义变量
 */

function setProperty(obj: any, path: string, val: any) {
  const pathArr = path.split(".");

  let temp = obj;
  for (let i = 0; i < pathArr.length; i++) {
    const key = pathArr[i];
    if (!temp[key]) {
      temp[key] = {};
    }
    temp = temp[key];

    // console.log(i, pathArr.length);
    // 如果path遍历到最后一位，添加属性
    if (i === pathArr.length - 1) {
      // console.log("temp", temp, key, val);
      temp[key] = val;
    }
  }

  return obj;
}

// 这里的递归实际上只是起到一个流程控制的作用
function setProperty_recursive(obj: any, path: string, val: any) {
  const pathArr = path.split(".");
  if (!pathArr.length) {
    return;
  }

  const key = pathArr[0];
  if (pathArr.length === 1) {
    obj[key] = val;
    return obj; // 流程结束，终止
  }

  if (!obj[key]) {
    obj[key] = {};
  }

  setProperty_recursive(obj[key], pathArr.slice(1).join("."), val);

  return obj;
}

// test case 1
const testObj1 = setProperty_recursive({ e: 1 }, "a.b.c.d", 123);
console.log("test1: ", testObj1, testObj1.a.b.c.d);
// test case 2
const testObj2 = setProperty_recursive({}, "a.b.c", 123);
console.log("test2: ", testObj2, testObj2.a.b.c);
