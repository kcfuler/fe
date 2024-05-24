function maximumSwap(num: number): number {
    const numArr = num.toString().split('').map(Number);
    const lastDices: Record<number, number> = new Array(numArr.length).fill(0);

    // 记录每个数字的最后索引
    for (let i = 0; i < numArr.length; i++) {
        lastDices[numArr[i]] = i;
    }

    for (let i = 0; i < numArr.length; i++) {
        // 在后面的数字中寻找比当前数字更大的
        for (let d = 9; d > numArr[i]; d--) {
            if (lastDices.hasOwnProperty(d) && lastDices[d] > i) {
                [numArr[i], numArr[lastDices[d]]] = [numArr[lastDices[d]], numArr[i]];
                return parseInt(numArr.join(''))
            }
        }
    }

    return num;
}