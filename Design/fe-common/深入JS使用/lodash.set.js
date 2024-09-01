function set(source, path, value = undefined) {
  if (!Array.isArray(path)) {
    path = path.replace(/\[(\w+)\]/g, ".$1").split(".");
  }

  const isNumber = (str) => str === String(Number(str));

  path.reduce((pre, cur, index) => {
    if (index === path.length - 1) {
      pre[cur] = value;
    }

    if (!pre[cur]) {
      // 看下一步key的类型，来确定当前的内容
      if (isNumber(path[index + 1])) {
        pre[cur] = [];
      } else {
        pre[cur] = {};
      }
    }

    return pre[cur];
  }, source);
}
