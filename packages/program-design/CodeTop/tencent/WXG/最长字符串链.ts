/*
* 我们可以将每个单词看作一个节点，如果一个单词是另一个单词的前身，那么我们可以在这两个节点之间创建一条有向边。
* 这样我们就创建了一个有向图。问题变成了在这个有向图中找到最长的路径。
* */
function longestStrChain(words: string[]): number {
    // 因为前身一定是比当前词更短的，使用排序后，可以通过索引的单调性剪枝
    words.sort((a, b) => a.length - b.length);

    // 使用dp对象来存储以每个单词结尾的最大词链长度
    const dp: Record<string, number> = {}
    let maxChainLength = 1; // 初始化最大词链的长度为1

    for (const wordB of words) {
        dp[wordB] = 1; // 每个单词自身形成的词链长度至少为1
        // 尝试通过移除 wordB 中的一个字符来生成所有可能的前身 wordA
        for (let i = 0; i < wordB.length; i++) {
            const wordA = wordB.slice(0, i) + wordB.slice(i + 1);
            if (wordA in dp && dp[wordA] + 1 > dp[wordB]) {
                dp[wordB] = dp[wordA] + 1;
                maxChainLength = Math.max(maxChainLength, dp[wordB]);
            }
        }
    }

    return maxChainLength
}
