/**
 * @param {any} obj
 * @param {target} target
 * @return {boolean}
 */
const myInstanceOf = (obj, target) => {
    if (typeof obj !== 'object' && typeof obj !== 'function' || obj === null) {
        return false;
    }
    const targetProto = target.prototype;
    let curProto = Reflect.getPrototypeOf(obj);
    while (curProto) {
        if (curProto === targetProto) {
            return true;
        }
        curProto = Reflect.getPrototypeOf(curProto);
    }

    return false;
};

// 测试用例
console.log("测试用例开始：");

// 测试 1: 基本对象实例
console.log("测试 1: 基本对象实例");
const obj = {};
console.log(myInstanceOf(obj, Object) === true, obj instanceof Object);

// 测试 2: 数组实例
console.log("测试 2: 数组实例");
const arr = [];
console.log(myInstanceOf(arr, Array) === true);
console.log(myInstanceOf(arr, Object) === true);

// 测试 3: 函数实例
console.log("测试 3: 函数实例");
const func = function() {};
console.log(myInstanceOf(func, Function) === true);
console.log(myInstanceOf(func, Object) === true);

// 测试 4: 自定义类
console.log("测试 4: 自定义类");
class MyClass {}
const myObj = new MyClass();
console.log(myInstanceOf(myObj, MyClass) === true);
console.log(myInstanceOf(myObj, Object) === true);
// 测试 9: 内置对象
console.log("测试 9: 内置对象");
console.log(myInstanceOf(new Date(), Date) === true);
console.log(myInstanceOf(new RegExp(), RegExp) === true);