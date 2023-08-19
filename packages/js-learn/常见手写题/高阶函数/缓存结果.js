// 通过高阶函数实现计算结果的缓存
function cached(fn) {
  const cachedObj = Object.create(null);
  return function cachedFn(str) {
    // 如果缓存中没有，就继续计算
    if (!cachedObj[str]) {
      let result = fn(str);
      cachedObj[str] = result;
    }
    // 有就直接返回
    return cachedObj[str];
  };
}
const calculateFn = (num) => {
  console.log("计算即缓存");
  const startTime = new Date();
  for (let i = 0; i < num; i++) {} // 大数计算
  const endTime = new Date();
  console.log(endTime - startTime); // 耗时
  return "Calculate big numbers";
};

let cashedCalculate = cached(calculateFn);
console.log(cashedCalculate(10_000_000_000)); // 计算即缓存 // 9944 // Calculate big numbers
console.log(cashedCalculate(10_000_000_000)); // Calculate big numbers

console.log(cashedCalculate(20_000_000_000)); // 计算即缓存 // 22126 // Calculate big numbers
console.log(cashedCalculate(20_000_000_000)); // Calculate big numbers
