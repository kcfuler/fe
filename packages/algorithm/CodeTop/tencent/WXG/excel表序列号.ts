function titleToNumber(columnTitle: string): number {
    let ans = 0;
    for (let i = 0; i < columnTitle.length; i++) {
        const charValue = columnTitle[i].charCodeAt(0) - 'A'.charCodeAt(0) + 1;
        ans = ans * 26 + charValue;
    }

    return ans;
}
