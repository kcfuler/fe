function thousandSeparator(n: number): string {
    // 将数字转换为字符串
    let numStr = Math.abs(n).toString();

    // 结果数组，用于存储添加分隔符后的各部分
    let result = [];

    // 从右向左遍历字符串
    for (let i = numStr.length - 1; i >= 0; i--) {
        // 将当前数字添加到结果数组的开头
        result.unshift(numStr[i]);

        // 如果不是第一个数字，且位置是3的倍数，添加分隔符
        if (i > 0 && (numStr.length - i) % 3 === 0) {
            result.unshift('.');
        }
    }

    // 如果原数字是负数，添加负号
    if (n < 0) {
        result.unshift('-');
    }

    // 将结果数组join成字符串并返回
    return result.join('');
}