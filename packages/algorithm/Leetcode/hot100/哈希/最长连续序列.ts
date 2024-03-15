function longestConsecutive(nums: number[]): number {
  const numSet = new Set(nums);
  let maxLen = 0;

  for (const num of nums) {
    if (numSet.has(num - 1)) continue;

    let curNum = num;
    let curLen = 1;

    while (numSet.has(curNum + 1)) {
      curNum++;
      curLen++;
    }

    maxLen = Math.max(maxLen, curLen);
  }

  return maxLen;
}