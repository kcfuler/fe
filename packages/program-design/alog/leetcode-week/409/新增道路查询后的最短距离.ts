function shortestPath(n: number, queries: number[][]): number[] {
  // 初始化图，使用邻接表表示
  let graph: number[][] = Array(n)
    .fill(null)
    .map(() => []);

  // 初始化距离数组，初始时从0到i的距离就是i
  let dist: number[] = Array(n)
    .fill(0)
    .map((_, i) => i);

  let answer: number[] = [];

  // 添加初始的边
  for (let i = 0; i < n - 1; i++) {
    graph[i].push(i + 1);
  }

  function bfs(start: number) {
    let queue: number[] = [start];
    let visited: boolean[] = Array(n).fill(false);
    visited[start] = true;
    let level = 0;

    while (queue.length > 0) {
      let size = queue.length;
      for (let i = 0; i < size; i++) {
        let curr = queue.shift()!;
        dist[curr] = Math.min(dist[curr], dist[start] + level);

        for (let next of graph[curr]) {
          if (!visited[next]) {
            visited[next] = true;
            queue.push(next);
          }
        }
      }
      level++;
    }
  }

  // 处理每个查询
  for (let [u, v] of queries) {
    // 添加新边
    graph[u].push(v);

    // 只需要更新从0到u的路径可能影响到的城市
    if (dist[u] < dist[v]) {
      bfs(u);
    }

    // 将当前从0到n-1的最短距离加入答案
    answer.push(dist[n - 1] === Infinity ? -1 : dist[n - 1]);
  }

  return answer;
}
