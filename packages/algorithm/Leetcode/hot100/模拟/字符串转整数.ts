function myAtoi(s: string): number {
    const INT_MAX = 2 ** 31 - 1; // 32位有符号整数的最大值
    const INT_MIN = -(2 ** 31); // 32位有符号整数的最小值

    let index = 0;
    let total = 0;
    let sign = 1; // 默认为正数

    // 1. 丢弃无用的前导空格
    while (index < s.length && s[index] === ' ') {
        index++;
    }

    // 2. 检查正负号
    if (index < s.length && (s[index] === '+' || s[index] === '-')) {
        sign = s[index] === '+' ? 1 : -1;
        index++;
    }

    // 3. 读入数字并进行转换
    while (index < s.length && s[index] >= '0' && s[index] <= '9') {
        let digit = s[index].charCodeAt(0) - '0'.charCodeAt(0);

        // 检查整数是否溢出
        if ((total > Math.floor(INT_MAX / 10)) ||
            (total === Math.floor(INT_MAX / 10) && digit > INT_MAX % 10)) {
            return sign === 1 ? INT_MAX : INT_MIN;
        }

        total = total * 10 + digit;
        index++;
    }

    return total * sign;
}
