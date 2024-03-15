// throttle函数用于创建一个节流函数，该函数在指定的延迟后才能再次执行
function throttle(func, delay) {
    // 定义一个变量来记录定时器的ID，初始为null
    let timer = null;

    // 返回一个新的函数，可以接收任意数量的参数
    return (...args) => {
        // 如果当前没有定时器在执行（即函数未被延迟执行）
        if (!timer) {
            // 设置一个延迟执行的定时器
            timer = setTimeout(() => {
                // 执行传入的函数，并传入参数
                func(...args);
                // 完成后清空定时器ID，表示下次可以再执行
                timer = null;
            }, delay);
        }
    };
}