// 第一种方法，使用JSON实现，但它有一些限制
// 1. 不能处理循环引用
// 2. 不能处理Data对象
// 3. 不能处理函数和RegExp对象等类型
function deepCopy(obj) {
  return JSON.parse(JSON.stringify(obj));
}

// 第二种方法，使用递归实现
function deepCopy_dfs(obj) {
  // 如果不是对象，直接返回
  if (typeof obj !== "object") {
    return obj;
  }
  // 如果是数组，创建一个新数组
  let newObj = obj instanceof Array ? [] : {};
  // 遍历对象的每一项, 如果是对象，递归调用deepCopy_dfs, 否则直接赋值
  for (let key in obj) {
    if (obj.hasOwnProperty(key)) {
      newObj[key] =
        typeof obj[key] === "object" ? deepCopy_dfs(obj[key]) : obj[key];
    }
  }
  return newObj;
}
