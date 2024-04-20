/*
*
* 可以使用单调栈来处理
* 存储索引更通用
* */
function dailyTemperatures(temperatures: number[]): number[] {
    const stack: number[] = [];
    let ans = new Array(temperatures.length).fill(0);

    /*
    * 单调栈中元素是依次递减的，栈顶元素就是当前元素的下一个更大的元素
    * */
    for (let i = temperatures.length - 1; i >= 0; i--) {
        while (stack.length !== 0 && temperatures[i] >= temperatures[stack[stack.length - 1]]) {
            stack.pop();
        }
        if (stack.length !== 0) {
            // 答案的要求是距离几天，所以 - i
            ans[i] = stack[stack.length - 1] - i;
        }
        stack.push(i);
    }

    return ans;
}