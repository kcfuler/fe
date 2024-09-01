function addComa(num) {
  const [p, q] = String(num).split(".");
  let cnt = 0,
    res = "";

  const regex = /[0-9]/;

  for (let i = p.length - 1; i >= 0; i--) {
    res = p[i] + res;

    if (++cnt % 3 === 0 && regex.test(p[i - 1])) {
      res = "," + res;
    }
  }

  if (q) {
    res = res + "." + q;
  }

  return res;
}

console.log(addComa(12321421323423.12312));
