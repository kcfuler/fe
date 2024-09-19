/**
 * 给你一个字符串表达式 s ，请你实现一个基本计算器来计算并返回它的值。
 *
 * 整数除法仅保留整数部分。
 *
 * 你可以假设给定的表达式总是有效的。所有中间结果将在 [-231, 231 - 1] 的范围内。
 *
 * 注意：不允许使用任何将字符串作为数学表达式计算的内置函数，比如 eval() 。
 */

/**
 * 整体还是栈来模拟计算
 */

function calculate(s: string): number {
    // 去除空格
    s = s.replace(/\s/g, '');

    if (s.length === 0) return 0;

    // 定义优先级
    const priority: Record<string, number> = {
        '+': 1,
        '-': 1,
        '*': 2,
        '/': 2,
    }

    const nums: number[] = [];
    const ops: string[] = [];

    // 计算
    const compute = () => {
        const b = nums.pop()!;
        const a = nums.pop()!;
        const op = ops.pop()!;

        switch (op) {
            case '+':
                nums.push(a + b);
                break;
            case '-':
                nums.push(a - b);
                break;
            case '*':
                nums.push(a * b);
                break;
            case '/':
                nums.push(Math.trunc(a / b));
                break;
        }
    }

    for (let i = 0; i < s.length; i++) {
        const c = s[i];

        // 处理数字
        if (c >= '0' && c <= '9') {
            let n = 0;
            // 处理多位数字
            while (i < s.length && s[i] >= '0' && s[i] <= '9') {
                n = n * 10 + Number(s[i]);
                i++;
            }
            i--;

            nums.push(n);
        }
        // 处理符号
        else {
            // 处理负号
            if (c === '-' && (i === 0 || s[i - 1] in priority)) {
                nums.push(0);
            }
            // 处理优先级, 注意这里同层的运算符要先计算，因为计算是分步的，中间数字会对计算结果有影响
            while (ops.length && priority[c] <= priority[ops[ops.length - 1]]) {
                compute();
            }
            ops.push(c);
        }
    }



    while (ops.length) {
        console.log('nums', nums);
        console.log('ops', ops);
        compute();
    }

    return nums[0];
}

// test
// console.log(calculate("1-1+1"));
