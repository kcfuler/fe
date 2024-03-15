function createProxy(target, handler) {
  const proxy = {};

  for (const prop in target) {
    Object.defineProperty(proxy, prop, {
      get() {
        return handler.get(target, prop);
      },
      set(value) {
        handler.set(target, prop, value);
      },
    });
  }
}

const handler = {
  get(target, prop) {
    console.log(`Getting ${prop}`);
    return target[prop];
  },

  set(target, prop, value) {
    console.log(`Setting ${prop} to ${value}`);
    target[prop] = value;
  },
};
