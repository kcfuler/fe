/**
 * 题目:
 * DNA序列 由一系列核苷酸组成，缩写为 'A', 'C', 'G' 和 'T'.。
 *
 * 例如，"ACGAATTCCG" 是一个 DNA序列 。
 * 在研究 DNA 时，识别 DNA 中的重复序列非常有用。
 *
 * 给定一个表示 DNA序列 的字符串 s ，返回所有在 DNA 分子中出现不止一次的 长度为 10 的序列(子字符串)。你可以按 任意顺序 返回答案。
 * */

/**
 * 思路：
 * 1. 数据结构：map，key - 序列，value - 序列出现的次数
 * 2. 算法：遍历长度为10的序列
 * */

function findRepeatedDnaSequences(s: string): string[] {
    const sequences = new Map();
    const result = [];

    for (let i = 0; i <= s.length - 10; i++) {
        const sub = s.slice(i, i + 10);
        sequences.set(sub, (sequences.get(sub) ?? 0) + 1);

        if (sequences.get(sub) === 2) {
            result.push(sub);
        }
    }
    return result;
}