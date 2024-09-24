/*
* 这个问题通常被称为 "柱状图中最大的矩形" 问题，它可以通过使用单调栈的方式来解决。
* 整体思路是：
*   我们遍历所有的柱子，对于每个柱子，我们用一个栈来维护所有未找到右边界的柱子的索引。
*   当当前柱子的高度小于栈顶柱子的高度时，说明当前柱子是栈顶柱子右边的第一个较低的柱子，即找到了栈顶柱子的右边界。
*   我们可以计算以栈顶柱子为高的矩形面积，并更新最大面积。同时，当前柱子也可能是之前某个柱子的右边界，因此我们需要不断地弹栈，直到栈顶柱子的高度小于当前柱子的高度。
*   当遍历完成后，栈中剩余的柱子是没有右边界的，它们的右边界可以认为是柱状图的最右边。
* */
function largestRectangleArea(heights: number[]): number {
    let maxArea = 0;
    const stack: number[] = []; // 存储索引

    for (let i = 0; i <= heights.length; i++) {
        //对于最后一个位置，使用高度0来触发栈内剩余柱子的运算
        const currentHeight = i === heights.length ? 0 : heights[i];

        // 如果当前的柱子的高度小于栈顶柱子的高度，或者栈为空，则需要处理栈中的柱子
        while (stack.length > 0 && heights[stack[stack.length - 1]] > currentHeight) {
            const height = heights[stack.pop()!];
            // 计算宽度
            const width = stack.length === 0 ? i : i - stack[stack.length - 1] - 1;
            // 更新最大面积
            maxArea = Math.max(maxArea, height * width);
        }

        stack.push(i);
    }

    return maxArea;
}