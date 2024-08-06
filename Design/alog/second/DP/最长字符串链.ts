function longestStrChain(words: string[]): number {
  words.sort((a, b) => a.length - b.length);

  let maxLen = 0;
  const dp: Record<string, number> = {};

  for (const wordB of words) {
    dp[wordB] = 1;

    for (let i = 0; i < wordB.length; i++) {
      const wordA = wordB.slice(0, i) + wordB.slice(i + 1);

      if (wordA in dp && dp[wordA] + 1 > dp[wordB]) {
        dp[wordB] = dp[wordA] + 1;
        maxLen = Math.max(dp[wordB], maxLen);
      }
    }
  }

  return maxLen;
}
