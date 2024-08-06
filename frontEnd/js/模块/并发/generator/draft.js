function spawn(genF) {
  return new Promise((resolve, reject) => {
    const gen = genF();
    const step = (nextF) => {
      let res;
      try {
        res = nextF();
      } catch (error) {
        return reject(error);
      }

      if (res.done) {
        return resolve(res.value);
      }

      Promise.resolve(res.value).then(
        (v) => step(() => gen.next(v)),
        (e) => step(() => gen.throw(e))
      );
    };

    step(() => gen.next(undefined));
  });
}
