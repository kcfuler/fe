const lazyMan = (name, logFn) => {
  const tasks = [() => logFn(`Hi I'm ${name}.`)];
  const eat = (food) => logFn(`Eat ${food}.`);
  const sleep = (time) => {
    return new Promise((resolve) =>
      setTimeout(() => resolve(), 1000 * time)
    ).then(() => logFn(`Wake up after ${time} second${time > 1 ? "s" : ""}.`));
  };
  setTimeout(async () => {
    for (const func of tasks) {
      await func();
    }
  });

  return {
    eat(food) {
      tasks.push(() => eat(food));
      return this;
    },
    sleep(time) {
      tasks.push(() => sleep(time));
      return this;
    },
    sleepFirst(time) {
      tasks.unshift(() => sleep(time));
      return this;
    },
  };
};

const log = console.log;
lazyMan("Jack", log).eat("banana").sleep(1).eat("apple").sleepFirst(2);
