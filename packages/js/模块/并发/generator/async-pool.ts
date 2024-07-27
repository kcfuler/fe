type IteratorFunction<T, U> = (
  item: T,
  index: number,
  iterable: Iterable<T>
) => Promise<U>;

/**
 * 1. task set
 * 2. promise.race
 * 3. while & yield
 *
 */

async function* asyncPool<T, U>(
  concurrency: number,
  iterable: Iterable<T>,
  iteratorFn: IteratorFunction<T, U>
): AsyncGenerator<U, void, unknown> {
  const executing = new Set<Promise<{ value: U; index: number }>>();
  const iterator = iterable[Symbol.iterator]();
  let index = 0;

  const nextTask = async (): Promise<{ value: U; index: number } | null> => {
    const { value, done } = iterator.next();
    if (done) return null;
    const task = iteratorFn(value, index, iterable).then((value) => ({
      value,
      index: index++,
    }));
    executing.add(task);
    return task;
  };

  const consume = async (): Promise<U> => {
    const [task] = await Promise.race(executing);
    executing.delete(task);
    return task.value;
  };

  while (executing.size > 0 || !iterator.next().done) {
    if (executing.size < concurrency) {
      const task = await nextTask();
      if (task) continue;
    }
    yield await consume();
  }
}
