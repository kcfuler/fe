function partitionLabels(s: string): number[] {
    let lastIndices: Record<string, number> = {};
    // 记录每个字符出现的最后位置
    for (let i = 0; i < s.length; i++) {
        lastIndices[s[i]] = i;
    }

    let partitions: number[] = []; // 记录答案
    let start = 0; // 当前片段的开始位置
    let end = 0; // 当前片段中任意字符最后一次出现的最远位置

    for (let i = 0; i < s.length; i++) {
        end = Math.max(end, lastIndices[s[i]]); // 更新最远位置
        if (i === end) { // 如果到达了片段中任意字符的最远位置，记录答案，并开始下一段
            partitions.push(i - start + 1);
            start = i + 1;
        }
    }

    return partitions;
}