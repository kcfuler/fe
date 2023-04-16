type Observer = {
  execute: Function;
};

const context = new Array<Observer>(); // 用于存储当前正在执行的函数

export function createSignal<T>(value: T): [() => T, (newValue: T) => void] {
  const description = new Set<Observer>(); // 存储响应式变量会影响的函数

  const read = () => {
    if (context.length) {
      description.add(context[context.length - 1]); // 将当前正在执行的函数添加到响应式变量的依赖列表中
    }
    return value;
  };
  const write = (newValue: T) => {
    for (const observer of description) observer.execute(); // 通知所有依赖该响应式变量的函数重新执行
    return (value = newValue);
  };
  return [read, write];
}

export function createEffect(fn: Function) {
  const effect = {
    execute() {
      context.push(effect); // 将当前正在执行的函数添加到上下文中
      fn();
      context.pop(); // 执行完毕后从上下文中移除
    },
  };

  effect.execute();
}
