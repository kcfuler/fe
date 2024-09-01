/**
 * repeat 方法
 * */
function repeat(str, n) {
  return Array(n + 1).join(str);
}

console.log(repeat("234", 2));

/**
 * flat 方法
 * 核心思路是通过递归控制层次，通过外部的变量收集内部元素
 * */

const flat = (arr, depth = 1) => {
  const res = [];
  const step = (cur, cnt) => {
    if (!Array.isArray(cur) || cnt <= 0) {
      res.push(cur);
      return;
    }

    for (const item of cur) {
      step(item, cnt - 1);
    }
  };

  step(arr, depth);

  return res;
};

console.log("flat: ", flat([1, [2, [3, [4, [5]]]]], 4));
