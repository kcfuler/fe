function partitionLabels(s: string): number[] {
  const m = new Map<string, number>();
  for (let i = 0; i < s.length; i++) {
    m.set(s[i], i);
  }

  const ans: number[] = [];
  let pre = 0;
  let curMax = 0;
  for (let i = 0; i < s.length; i++) {
    curMax = Math.max(m.get(s[i])!, curMax);
    if (curMax === i) {
      ans.push(i - pre + 1);
      pre = i + 1;
      curMax = 0;
    }
  }

  return ans;
}
