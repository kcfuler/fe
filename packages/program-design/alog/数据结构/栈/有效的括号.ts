function isValid(s: string): boolean {
    const map: Record<string, string> = {
        ")": "(",
        "]": "[",
        "}": "{",
    }
    const stk: string[] = [];

    for (const char of s) {
        // 如果是右括号
        if (char in map) {
            let topElement = stk.length === 0 ? '#' : stk.pop();
            if (map[char] !== topElement) {
                return false;
            }
        } else {
            // 如果是左括号，推入栈中
            stk.push(char)
        }
    }

    return stk.length === 0;
}