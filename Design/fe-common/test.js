function spawn1(genF) {
  return new Promise((resolve, reject) => {
    let gen = genF();

    step(() => gen.next(undefined));

    function step(nextF) {
      let next;
      try {
        next = nextF();
      } catch (error) {
        return reject(error);
      }

      if (next.done) {
        return resolve(next.value);
      }

      Promise.resolve(next.value).then(
        (value) => {
          step(() => gen.next(value));
        },
        (reason) => {
          step(() => gen.throw(reason));
        }
      );
    }
  });
}
