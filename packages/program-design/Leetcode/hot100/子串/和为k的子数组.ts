// 这题使用前缀和解决
// 1. pre[j] - pre[i] <=> nums[i..j]的和
function subarraySum(nums: number[], k: number): number {
  let ans = 0;
  let m: Record<number, number> = { 0: 1 };

  let preCount = 0;
  for (const n of nums) {
    preCount += n;

    if (preCount - k in m) {
      ans += m[preCount - k];
    }

    m[preCount] = (m[preCount] || 0) + 1;
  }

  return ans;
};