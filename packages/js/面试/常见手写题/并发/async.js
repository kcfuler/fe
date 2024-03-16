async function* asyncPool(cnt, items, handler) {
    const execution = new Set();

    async function consume() {
        const [promise, value] = await Promise.race(execution);
        execution.delete(promise);
        return value;
    }

    for (const item of items) {
        // 存储自己的引用
        const promise = (async () => handler(item, execution)).then(value => [promise, value]);

        execution.add(promise);

        if (execution.size > cnt) {
            yield await consume();
        }
    }

    while (execution.size) {
        yield await consume();
    }
}
