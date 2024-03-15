/*
* 维护一个栈，栈中元素附带当前最小值
* */

interface Item {
    value: number;
    min: number;
}

class MinStack {
    private stack: Item[]

    constructor() {
        this.stack = [];
    }

    push(val: number): void {
        const min = this.stack.length === 0 ? val : Math.min(val, this.getMin());
        this.stack.push({value: val, min})
    }

    pop(): void {
        this.stack.pop();
    }

    // 返回栈顶元素的值
    top(): number {
        return this.stack[this.stack.length - 1].value;
    }

    // 返回栈顶元素保存的最小值
    getMin(): number {
        return this.stack[this.stack.length - 1].min;
    }
}