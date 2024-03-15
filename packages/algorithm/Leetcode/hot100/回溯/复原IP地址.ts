function restoreIpAddresses(s: string): string[] {
    const result: string[] = [];

    function backtrack(subResult: string[], startIndex: number): void {
        // 如果已经找到了4段IP地址，并且遍历完了字符串，那么就是一个解
        if (subResult.length === 4 && startIndex === s.length) {
            result.push(subResult.join('.'));
            return;
        }

        // 如果剩下的不足以填满剩下的段，或者多到无法有效分配，则剪枝
        if (s.length - startIndex < 4 - subResult.length ||
            s.length - startIndex > (4 - subResult.length) * 3) {
            return;
        }

        for (let i = 1; i <= 3; i++) {
            // 如果剩下的字符不够，剪枝
            if (startIndex + i > s.length) break;

            // 取出一个段的字符串
            const segment = s.substring(startIndex, startIndex + i);

            // 有效性检查：长度大于 1 的段不能以 0 开始，数值必须小于等于 255
            if ((segment.length > 1 && segment[0] === '0') || (parseInt(segment) > 255)) continue;

            // 做选择
            subResult.push(segment);

            // 进入下一层决策树
            backtrack(subResult, startIndex + i);

            // 撤销选择
            subResult.pop();
        }
    }

    backtrack([], 0);
    return result;
}

// 示例用法:
console.log(restoreIpAddresses("25525511135"));
