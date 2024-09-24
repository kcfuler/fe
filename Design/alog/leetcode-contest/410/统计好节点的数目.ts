function countGoodNodes(edges: number[][]): number {
  let ans = 0;

  let graph: Set<number>[] = [];
  for (const [from, to] of edges) {
    if (!graph[from]) graph[from] = new Set<number>();
    if (!graph[to]) graph[to] = new Set<number>();
    graph[from].add(to);
    graph[to].add(from);
  }

  console.log("graph", graph);

  const stat = new Array<boolean>(graph.length).fill(false);
  // 开始遍历
  const dfs = (node: number) => {
    if (!graph[node].size || stat[node]) {
      ans++;
      return 1;
    }

    stat[node] = true;

    let cnt = 1;
    let isSame = true;
    let pre = -1;
    for (const child of graph[node]) {
      const v = dfs(child);
      cnt += v;
      // console.log("node: ", node, "v: ", v);
      if (pre === -1) {
        pre = v;
      }
      if (pre !== v) {
        isSame = false;
      }
    }

    ans += isSame ? 1 : 0;
    // if (node === 0 && )

    // console.log("node", node, "cnt", cnt);

    return cnt;
  };

  dfs(0);

  return ans;
}

// console.log(
//   "ans: ",
//   countGoodNodes([
//     [0, 1],
//     [1, 2],
//     [2, 3],
//     [3, 4],
//     [0, 5],
//     [1, 6],
//     [2, 7],
//     [3, 8],
//   ])
// );

// console.log(
//   "ans :",
//   countGoodNodes([
//     [0, 1],
//     [0, 2],
//     [1, 3],
//     [1, 4],
//     [2, 5],
//     [2, 6],
//   ])
// );

console.log(
  "ans: ",
  countGoodNodes([
    [6, 0],
    [1, 0],
    [5, 1],
    [2, 5],
    [3, 1],
    [4, 3],
  ])
);
