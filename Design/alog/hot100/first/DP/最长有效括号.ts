/*
* 使用栈 + 记录索引的方式
* */
function longestValidParentheses(s: string): number {
    let maxLen = 0;
    const stack: number[] = [-1]; // 初始化时压入 -1 作为参照点

    for (let i = 0; i < s.length; i++) {
        if (s[i] === '(') {
            // 遇到左括号, 索引入栈
            stack.push(i);
        } else {
            // 遇到右括号，索引出栈
            stack.pop();
            if (stack.length === 0) {
                // 如果栈为空，说明当前的右括号无法匹配，将其索引入栈
                stack.push(i);
            } else {
                maxLen = Math.max(maxLen, i - stack[stack.length - 1]);
            }
        }
    }

    return maxLen;
}