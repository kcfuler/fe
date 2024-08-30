function myNew(func, ...args) {
    const newObj = Object.create(func.prototype);
    const result = func.apply(newObj, args);

    return typeof result === 'object' && result !== null ? result : newObj;
}