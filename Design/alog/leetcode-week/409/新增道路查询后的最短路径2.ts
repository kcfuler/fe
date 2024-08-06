function shortestDistanceAfterQueries(
  n: number,
  queries: number[][]
): number[] {
  const fa: number[] = Array.from({ length: n - 1 }, (_, i) => i);

  // Non-recursive union-find
  const find = (x: number): number => {
    let rt = x;
    while (fa[rt] !== rt) {
      rt = fa[rt];
    }
    while (fa[x] !== rt) {
      [fa[x], x] = [rt, fa[x]];
    }
    return rt;
  };

  const ans: number[] = new Array(queries.length).fill(0);
  let cnt: number = n - 1; // Number of connected components in the union-find

  // 将图中的边使用并查集中的点来表示
  // 连接 l, r => 将 (l, r)之间的边（点）合并
  queries.forEach(([l, r], qi) => {
    const fr: number = find(r - 1);
    let i: number = find(l);
    while (i < r - 1) {
      // 还没连过
      cnt--;
      fa[i] = fr;
      i = find(i + 1);
    }
    ans[qi] = cnt;
  });

  return ans;
}
