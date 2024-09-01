function assign(target, ...sources) {
  if (!target) {
    throw new TypeError(
      "TypeError: Cannot convert undefined or null to object",
    );
  }
  const ret = Object(target);
  sources.forEach((source) => {
    if (source) {
      source = Object(source);
      for (const key of Reflect.ownKeys(source)) {
        if (Reflect.getOwnPropertyDescriptor(source, key).enumerable) {
          ret[key] = source[key];
          if (ret[key] !== source[key]) {
            throw new Error();
          }
        }
      }
    }
  });

  return ret;
}
