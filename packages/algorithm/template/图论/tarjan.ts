export type ArticulationNode = number;
export type Bridge = number[];

export type IGetTarjan = (n: number, graph: number[][]) => { articulationNodes: ArticulationNode[], bridges: Bridge[] }

export const getTarjan: IGetTarjan = (n: number, connection: number[][]) => {
  let time = 0;
  const disc = new Array(n).fill(-1);
  const low = new Array(n).fill(-1);
  const graph = new Array(n).fill([]);

  for (const [u, v] of connection) {
    graph[u].push(v);
    graph[v].push(u);
  }

  const articulationNodes: number[] = [];
  const bridges: number[][] = [];

  const dfs = (node: number, parent: number) => {
    low[node] = disc[node] = ++time;
    for (const neighbor of graph[node]) {
      if (disc[neighbor] === -1) {
        dfs(neighbor, node);
        low[node] = Math.min(low[node], low[neighbor]);

        if (low[neighbor] > disc[node]) {
          bridges.push([node, neighbor]);
        }
        if (low[neighbor] >= disc[node]) {
          articulationNodes.push(node);
        }
      } else if (neighbor !== parent) {
        low[node] = Math.min(low[node], low[neighbor]);
      }
    }
  }

  for (let i = 0; i < n; i++) {
    if (disc[i] === -1) {
      dfs(i, -1);
    }
  }

  return {
    articulationNodes,
    bridges
  }
}