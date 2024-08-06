const {Worker, isMainThread, parentPort} = require('worker_threads');

if (isMainThread) {
    // 这段代码在主线程执行

    // 创建一个 Worker 线程
    const worker = new Worker(__filename);

    // 接收来自 Worker 的消息
    worker.on('message', (msg) => {
        console.log(`来自 Worker 的消息: ${msg}`);
    });

    // 发送消息到 Worker
    worker.postMessage('Hello, Worker!');

    // 监听 Worker 的错误
    worker.on('error', (err) => {
        console.error(err);
    });

    // 监听 Worker 的退出
    worker.on('exit', (code) => {
        if (code !== 0)
            console.error(`Worker 停止，退出码: ${code}`);
    });
} else {
    // 这段代码在 Worker 线程执行

    // 接收来自主线程的消息
    parentPort.on('message', (msg) => {
        console.log(`来自主线程的消息: ${msg}`);
        // 回复消息到主线程
        parentPort.postMessage('Hello, main thread!');
    });
}