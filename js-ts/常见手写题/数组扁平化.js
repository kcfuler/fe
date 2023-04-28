function flat(arr, depth) {
  if (!Array.isArray(arr) || depth <= 0) {
    return arr;
  }
  return arr.reduce((prev, cur) => {
    if (Array.isArray(prev)) {
      return prev.concat(flat(cur, depth - 1));
    } else {
      return prev.concat(cur);
    }
  }, []);
}

console.log(flat([1, [2, [3, [4, [5]]]]], 3));
