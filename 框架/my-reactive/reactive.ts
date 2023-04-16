type Observer = {
  execute: Function;
  dependencies: Set<Set<Observer>>;
};

const context = new Array<Observer>(); // 用于存储当前正在执行的函数

// 处理分支切换的问题
function cleanup(observer: Observer) {
  for (const subscriptions of observer.dependencies)
    subscriptions.delete(observer);
}

function subscribe(observer: Observer, subscriptions: Set<Observer>) {
  subscriptions.add(observer);
  observer.dependencies.add(subscriptions);
}

// every signals is dependent on the context
export function createSignal<T>(value: T): [() => T, (newValue: T) => void] {
  const subscriptions = new Set<Observer>(); // 存储响应式变量会影响的函数

  const read = () => {
    if (context.length) {
      const observer = context[context.length - 1];
      subscribe(observer, subscriptions); // 将当前正在执行的函数添加到响应式变量的依赖列表中
      // subscriptions.add(context[context.length - 1]); // 将当前正在执行的函数添加到响应式变量的依赖列表中
    }
    return value;
  };
  const write = (newValue: T) => {
    // 这里的 ... 通过创建一个新的数组,避免在循环中修改 subscriptions导致的无限循环
    for (const observer of [...subscriptions]) observer.execute(); // 通知所有依赖该响应式变量的函数重新执行
    return (value = newValue);
  };
  return [read, write];
}

export function createEffect(fn: Function) {
  const effect = {
    execute() {
      cleanup(effect); // 清除上一次执行的函数产生的副作用
      context.push(effect); // 将当前正在执行的函数添加到上下文中
      fn();
      context.pop(); // 执行完毕后从上下文中移除
    },
    dependencies: new Set<Set<Observer>>(),
  };
  effect.execute();
}
