/*
* 使用两个栈：
*   一个用来保存数字（即重复次数），
*   另一个用来保存当前处理的字符串。
*   当遇到 ']' 时，我们知道一个编码字符串结束了，这时我们可以开始解码。
* */
function decodeString(s: string): string {
    let countStack = [];
    let stringStack = [];
    let currentString = '';
    let k = 0;

    // 有种递归的美
    for (let char of s) {
        // 处理数字
        if (char >= '0' && char <= '9') {
            k = k * 10 + parseInt(char);
        } else if (char === '[') {
            // 把数字push到count栈中，将string也push到栈中
            countStack.push(k);
            stringStack.push(currentString);

            // 重置两个量
            k = 0;
            currentString = '';
        } else if (char === ']') {
            let decodingString = stringStack.pop();
            let count = countStack.pop()!;
            currentString = decodingString + currentString.repeat(count);
        } else {
            currentString += char;
        }
    }

    return currentString;
}