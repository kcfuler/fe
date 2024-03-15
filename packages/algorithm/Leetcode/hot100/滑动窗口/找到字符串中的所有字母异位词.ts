function findAnagrams(s: string, p: string): number[] {
  const ans: number[] = [];
  const sLen = s.length;
  const pLen = p.length;
  const sCount = new Array<number>(26).fill(0);
  const pCount = new Array<number>(26).fill(0);

  for (let i = 0; i < pLen; i++) {
    sCount[s.charCodeAt(i) - 'a'.charCodeAt(0)]++;
    pCount[p.charCodeAt(i) - 'a'.charCodeAt(0)]++;
  }

  if (sCount.toString() === pCount.toString()) {
    ans.push(0);
  }

  for (let i = 0; i < sLen - pLen; i++) {
    sCount[s.charCodeAt(i) - 'a'.charCodeAt(0)]--;
    sCount[s.charCodeAt(i + pLen) - 'a'.charCodeAt(0)]++;

    // 因为前面两行的操作实际上就是滑动窗口往后移动一位
    if (sCount.toString() === pCount.toString()) {
      ans.push(i + 1);
    }
  }

  return ans;
};