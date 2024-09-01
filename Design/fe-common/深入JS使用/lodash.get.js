function get(source, path, defaultValue = undefined) {
  if (!Array.isArray(path)) {
    path = path.replace(/\[(\w+)\]/g, ".$1").split(".");
  }

  if (path.length === 0) {
    return defaultValue;
  }

  const res = path.reduce((pre, cur) => pre[cur], source);

  return res ?? defaultValue;
}
