function lengthOfLongestSubstring(s: string): number {
  let ans = 0;

  const m: Record<string, number> = {};

  let j = 0;
  for (let i = 0; i < s.length; i++) {
    if (!m[s[i]]) m[s[i]] = 0;
    m[s[i]] = m[s[i]] + 1;

    while (m[s[i]] > 1) {
      m[s[j]] = m[s[j]] - 1;
      j++;
    }

    ans = Math.max(i - j + 1, ans);
  }

  return ans;
};