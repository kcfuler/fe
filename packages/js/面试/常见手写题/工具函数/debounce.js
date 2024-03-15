// debounce函数接受两个参数：fn是需要去抖处理的函数，delay是时间延迟（以毫秒为单位）
function debounce(fn, delay) {
    let timer = null; // 用来存储计时器ID

    // 返回一个新的函数，该函数在触发时会应用去抖控制
    return (...args) => {
        clearTimeout(timer); // 每次触发事件时，清除之前的计时器
        // 重新设置一个计时器，如果在delay时间内没有再次触发事件，则执行函数fn
        timer = setTimeout(() => {
            fn(...args); // 调用fn函数，并传入...args参数
        }, delay);
        // 如果在delay时间内事件再次触发，则上一次的计时器被清除，函数不会执行，从而实现去抖
    };
}