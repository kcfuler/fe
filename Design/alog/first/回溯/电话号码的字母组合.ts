function letterCombinations(digits: string): string[] {
    const digitsMap: Record<string, string> = {
        '2': 'abc',
        '3': 'def',
        '4': 'ghi',
        '5': 'jkl',
        '6': 'mno',
        '7': 'pqrs',
        '8': 'tuv',
        '9': 'wxyz',
    }

    const res: string[] = [];
    const backTrack = (index: number, path: string) => {
        if (path.length === digits.length) {
            res.push(path.slice())
            return;
        }

        let chars = digitsMap[digits[index]];
        for (const ch of chars) {
            backTrack(index + 1, path + ch);
        }
    }

    return res;
}