function criticalConnections(n: number, connections: number[][]): number[][] {
  const graph: number[][] = Array.from({ length: n }, () => []);
  const low: number[] = new Array(n).fill(0);
  const disc: number[] = new Array(n).fill(-1);
  const bridges: number[][] = []
  let time = 0;

  for (const [u, v] of connections) {
    graph[u].push(v);
    graph[v].push(u);
  }

  function dfs(node: number, parent: number) {
    disc[node] = low[node] = ++time;

    for (const neighbor of graph[node]) {
      if (disc[neighbor] === -1) {
        dfs(neighbor, node);
        low[node] = Math.min(low[node], low[neighbor]);

        // 去除这个节点后，子节点不能与父节点连通
        if (low[neighbor] > disc[node]) {
          bridges.push([node, neighbor]);
        }

      } else if (neighbor !== parent) {
        low[node] = Math.min(low[node], low[neighbor]);
      }
    }
  }

  for (let i = 0; i < n; ++i) {
    if (disc[i] === -1) {
      dfs(i, -1);
    }
  }


  return bridges;
};