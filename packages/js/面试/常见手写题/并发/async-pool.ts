type IteratorFunction<T, U> = (item: T, iterable: Iterable<T>) => Promise<U>;

async function* asyncPool<T, U>(concurrency: number, iterable: Iterable<T>, handler: IteratorFunction<T, U>) {
    // 存储需要执行的任务，两层 promise 是为了保证执行函数是 promise（无法控制用户）
    const executing: Set<Promise<[Promise<any>, U]>> = new Set();

    // 并发请求，async 函数返回值
    async function consume(): Promise<U> {
        const [promise, value] = await Promise.race(executing);
        executing.delete(promise);
        return value;
    }

    //
    for (const item of iterable) {
        const wrappedPromise: Promise<[Promise<any>, U]> = (async () => await handler(item, iterable))().then(value => [wrappedPromise, value]);
        executing.add(wrappedPromise);
        if (executing.size >= concurrency) {
            yield await consume();
        }
    }

    while (executing.size) {
        yield await consume();
    }
}
