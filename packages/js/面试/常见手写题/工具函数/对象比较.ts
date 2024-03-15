/* 
1. 深层次比较两个对象
2. 包含任意类型，任意嵌套层级
*/

function deepCompare(x: any, y: any): boolean {
    if (x === y) {
        return true;
    }

    if (typeof x === "object" && x != null && typeof y === "object" && y != null) {
        if (Object.keys(x).length !== Object.keys(y).length) return false;

        for (const prop in x) {
            if (y.hasOwnProperty(prop)) {
                if (!deepCompare(x[prop], y[prop])) return false;
            } else {
                return false;
            }
        }

        return true;
    }

    // 特殊类型处理
    // 检查Date对象
    if (x instanceof Date && y instanceof Date) {
        return x.getTime() === y.getTime();
    }

    // 检查正则表达式
    if (x instanceof RegExp && y instanceof RegExp) {
        return x.toString() === y.toString();
    }

    // 检查包装的原始类型
    if ((typeof x === 'object' && x instanceof Number && typeof y === 'object' && y instanceof Number) ||
        (typeof x === 'object' && x instanceof String && typeof y === 'object' && y instanceof String) ||
        (typeof x === 'object' && x instanceof Boolean && typeof y === 'object' && y instanceof Boolean)) {
        return x.valueOf() === y.valueOf();
    }

    return false;
}


// 基本类型
console.assert(deepCompare(1, 1), 'Numbers 1 and 1 should be equal.');
console.assert(!deepCompare(1, '1'), 'Number 1 and string "1" should not be equal.');
console.assert(deepCompare('text', 'text'), 'Strings "text" and "text" should be equal.');
console.assert(!deepCompare('text', 'another'), 'Strings "text" and "another" should not be equal.');
console.assert(!deepCompare(true, false), 'Boolean true and false should not be equal.');
console.assert(deepCompare(null, null), 'null and null should be equal.');
console.assert(!deepCompare(undefined, null), 'undefined and null should not be equal.');

// 数组
console.assert(deepCompare([1, 2, 3], [1, 2, 3]), 'Arrays [1, 2, 3] and [1, 2, 3] should be equal.');
console.assert(!deepCompare([1, 2, 3], [1, 2, 4]), 'Arrays [1, 2, 3] and [1, 2, 4] should not be equal.');
console.assert(deepCompare([1, [2, 3]], [1, [2, 3]]), 'Nested arrays [1, [2, 3]] and [1, [2, 3]] should be equal.');
console.assert(!deepCompare([1, [2, 3]], [1, [2, 3, 4]]), 'Nested arrays [1, [2, 3]] and [1, [2, 3, 4]] should not be equal.');

// 对象
console.assert(deepCompare({a: 1, b: 2}, {a: 1, b: 2}), 'Objects { a: 1, b: 2 } and { a: 1, b: 2 } should be equal.');
console.assert(!deepCompare({a: 1, b: 2}, {
    a: 1,
    b: 3
}), 'Objects { a: 1, b: 2 } and { a: 1, b: 3 } should not be equal.');
console.assert(deepCompare({a: 1, b: {c: 2}}, {
    a: 1,
    b: {c: 2}
}), 'Nested objects { a: 1, b: { c: 2 } } and { a: 1, b: { c: 2 } } should be equal.');
console.assert(!deepCompare({a: 1, b: {c: 2}}, {
    a: 1,
    b: {c: 3}
}), 'Nested objects { a: 1, b: { c: 2 } } and { a: 1, b: { c: 3 } } should not be equal.');

// 特殊情况
console.assert(deepCompare({a: 1, b: undefined}, {
    a: 1,
    b: undefined
}), 'Objects with undefined properties should be equal.');
console.assert(!deepCompare({
    a: 1,
    b: undefined
}, {a: 1}), 'Object with undefined property should not equal object without that property.');
console.assert(deepCompare({}, {}), 'Empty objects should be equal.');
console.assert(deepCompare([], []), 'Empty arrays should be equal.');
console.assert(!deepCompare([null], [undefined]), 'Array with null should not equal array with undefined.');
console.assert(!deepCompare({a: {b: {c: 1}}}, {
    a: {
        b: {
            c: 1,
            d: undefined
        }
    }
}), 'Objects with different properties should not be equal.');
// The following cases are expected to fail without additional logic to handle special types.
console.assert(deepCompare(new Date('2024-01-01'), new Date('2024-01-01')), 'Date objects representing the same time should be equal.');
console.assert(deepCompare(/abc/, /abc/), 'Regular expressions with the same pattern should be equal.');
console.assert(deepCompare([new Number(3)], [new Number(3)]), 'Boxed numbers with the same value should be equal.');
