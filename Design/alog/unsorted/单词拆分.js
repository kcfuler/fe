/**
 * @param {string} s
 * @param {string[]} wordDict
 * @return {boolean}
 *
 * 第一眼感觉上很像背包
 * 1. 如何让字符对应的单个索引和字典中的词对应起来 => 通过索引，暴力取所有字符串的组合 substring(i, j);
 * 2. 为什么要倒序遍历 => 因为正序会导致状态数据被污染
 * 3. 为什么要break => 确定能到达i即可 => 没必要多算那几次
 * 4. 为什么dp数组 length 需要 + 1 => substring函数是[j, i) => 不多算一位取不到所有的字符
 */
var wordBreak = function (s, wordDict) {
  const dictSet = new Set(wordDict);
  const dp = new Array(s.length + 1).fill(false);
  dp[0] = true;

  for (let i = 1; i <= s.length; i++) {
    for (let j = 0; j < i; j++) {
      if (dp[j] && dictSet.has(s.substring(j, i))) {
        dp[i] = true;
        break;
      }
    }
  }

  return dp[s.length];
};
