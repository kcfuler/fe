/*
  1. 目标和分析
  核心思路： 将未知量转化为已知量
  数字可以添加正数p、复数n，要求答案等于目标和t
  总和 s
  正数 p
  负数 n = s - p
  t = p - (s - p)
  t = p - s + p
  2p = s + t
  p = (s + t) / 2 -> 用数组中的元素构成 p 

 */
function zeroPackage(capacity: number, w: number[], v: number[]) {
  const len = w.length;
  const memo = new Array(len).fill(-1);

  function dfs(i: number, c: number): number {
    if (i === 0) {
      return 0;
    }
    // 记忆化搜索
    if (memo[i] !== -1) {
      return memo[i];
    }

    if (w[i] > c) {
      memo[i] = dfs(i - 1, c);
      return memo[i];
    }
    memo[i] = Math.max(dfs(i - 1, c), dfs(i - 1, c - w[i]) + v[i]);

    return memo[i];
  }

  return dfs(len - 1, capacity);
}

function findTargetSumWays(nums: number[], target: number): number {
  target += nums.reduce((prev, cur) => prev + cur, 0);
  if (target < 0 || target % 2) {
    return 0;
  }
  target = Math.floor(target / 2);

  const len = nums.length;

  const memo = new Map<string, number>();
  function dfs(i: number, c: number) {
    if (i < 0) {
      return c === 0 ? 1 : 0;
    }
    const key = `${i},${c}`;
    if (memo.has(key)) {
      return memo.get(key)!;
    }

    let res: number;
    if (c < nums[i]) {
      res = dfs(i - 1, c);
    } else {
      res = dfs(i - 1, c) + dfs(i - 1, c - nums[i]);
    }

    memo.set(key, res);
    return res;
  }

  return dfs(len - 1, target);
}

function findTargetSumWaysNoRecursive(nums: number[], target: number): number {
  target += nums.reduce((prev, cur) => prev + cur, 0);
  if (target < 0 || target % 2) {
    return 0;
  }
  target = Math.floor(target / 2);

  const len = nums.length;

  const memo = new Map<string, number>();
  function dfs(i: number, c: number) {
    if (i < 0) {
      return c === 0 ? 1 : 0;
    }
    const key = `${i},${c}`;
    if (memo.has(key)) {
      return memo.get(key)!;
    }

    let res: number;
    if (c < nums[i]) {
      res = dfs(i - 1, c);
    } else {
      res = dfs(i - 1, c) + dfs(i - 1, c - nums[i]);
    }

    memo.set(key, res);
    return res;
  }

  return dfs(len - 1, target);
}
