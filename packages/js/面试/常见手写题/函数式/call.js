// 原理是对象上调用方法，this指向对象
function call(context, ...args) {
    context = context || window
    context.fn = this
    const result = context.fn(...args)
    delete context.fn // 防止内存泄漏
    return result
}
