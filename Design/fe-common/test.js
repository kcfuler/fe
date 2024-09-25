function run(generatorFunc) {
  const gen = generatorFunc();

  return new Promise((resolve, reject) => {
    const next = (nextFn, arg) => {
      let result;
      try {
        result = nextFn.call(gen, arg);
      } catch (e) {
        reject(e);
      }

      if (result.done) {
        return resolve(result.value);
      }

      Promise.resolve(result.value).then(
        (val) => next(gen.next, val),
        (err) => next(gen.throw, err),
      );
    };

    next(gen.next);
  });
}
