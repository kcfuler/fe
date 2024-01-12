/*
* 使用BFS + 染色法
* */
function isBipartite(graph: number[][]): boolean {
    const n = graph.length;
    const colors = new Array(n + 1).fill(0);
    const queue : number[]= [];

    // 非连通图也可以组成二分图
    for (let start = 0; start < n; start ++) {
        if (colors[start] !== 0) continue;

        queue.push(start);
        colors[start] = 1;

        while (queue.length) {
            const cur = queue.shift()!;
            const curColor = colors[cur];
            const neighborColor = curColor === 1 ? 2 : 1;

            for (const neighbor of graph[cur]) {
                if (colors[neighbor] === 0) {
                    colors[neighbor] = neighborColor;
                    queue.push(neighbor);
                } else if (colors[neighbor] !== neighborColor) {
                    return false;
                }
            }
        }
    }

    return true;
}