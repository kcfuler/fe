function myTypeof(target: any) {
    const toStringInfo = Object.prototype.toString.call(target);
    const typeStr = toStringInfo.match(/^\[object (\w+)]$/)?.[1];
    return typeStr?.toLowerCase();
}

console.assert(myTypeof(new Map()) === 'map', 'get map type error');

function isBaseType(target: any) {
    return typeof target !== 'object' || typeof target === null;
}

function isEqual(a: any, b: any): boolean {
    // 类型不同就不用比较了，直接返回false
    if (myTypeof(a) !== myTypeof(b)) {
        return false;
    }
    // 基础类型直接比较
    if (isBaseType(a)) {
        return a === b;
    }

    // 函数类型直接返回true
    if (myTypeof(a) === 'function') {
        return true;
    }

    // 映射类型
    if (myTypeof(a) === 'map' || myTypeof(a) === 'object') {
        const keys = Object.keys(a);
        for (const key of keys) {
            if (!isEqual(a[key], b[key])) {
                return false
            }
        }
    }

    // 数组类型

    return true;
}

// 确实是有问题的，数组的比较还是需要考虑顺序
const a = [1, 2, 3, {b : 1}, {a: 2}];
const b = [3, 2, 1, {a :2}];

console.log(a.sort(), b.sort())
