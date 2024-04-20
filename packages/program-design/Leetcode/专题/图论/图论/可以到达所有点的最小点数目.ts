/*
* 给你一个 有向无环图 ， n 个节点编号为 0 到 n-1 ，以及一个边数组 edges ，
* 其中 edges[i] = [fromi, toi] 表示一条从点  fromi 到点 toi 的有向边。
*
* 找到最小的点集使得从这些点出发能到达图中所有点。题目保证解存在且唯一。
*
* 你可以以任意顺序返回这些节点编号。
* */

/*
* */
function findSmallestSetOfVertices(n: number, edges: number[][]): number[] {
  const res: number[] = [];
  const inDegree = new Array(n).fill(0);

  edges.forEach(([_, y]) => {
    inDegree[y]++;
  })

  inDegree.forEach((item, index) => {
    if (item === 0) {
      res.push(index);
    }
  })

  return res;
}