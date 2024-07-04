function minWindow(s: string, t: string): string {
  let ans = '';
  if (!s.length || !t.length) {
    return ans;
  }

  // t count
  const tFreq: Record<string, number> = {};
  for (let char of t) {
    if (tFreq[char] === null) tFreq[char] = 0;
    tFreq[char]++;
  }

  // 需要匹配的字符种类数
  const required = Object.keys(tFreq).length;

  const winFreq: Record<string, number> = {};
  let l = 0, r = 0, form = 0;
  let record = [-1, 0, 0];

  while (r < s.length) {
    const c = s[r];
    if (winFreq[c] === null) winFreq[c] = 0;
    winFreq[c]++;

    // 当前窗口中已经匹配的字符总数
    if (tFreq[c] !== null && tFreq[c] === winFreq[c]) {
      form++;
    }

    // 当窗口满足所有字符后，尝试缩小窗口
    while (l <= r && form === required) {
      const char = s[l];

      // 更新最小子串的位置和长度
      if (record[0] === -1 || r - l + 1 < record[0]) {
        record[0] = r - l + 1;
        record[1] = l;
        record[2] = r;
      }

      // 左侧字符出窗
      winFreq[char]--;
      if (tFreq[char] !== null && winFreq[char] < tFreq[char]) {
        form--;
      }

      // 缩小窗口
      l++;
    }

    // 继续扩大窗口
    r++;
  }

  return ans;
};