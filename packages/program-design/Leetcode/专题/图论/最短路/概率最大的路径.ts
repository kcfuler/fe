
// 就是求最长路
import {PriorityQueue} from '../../../data_structure/PriorityQueue/PriorityQueue'

export function maxProbability(
    n: number,
    edges: number[][],
    succProb: number[],
    start: number,
    end: number
): number {
    // 创建图的邻接表表示
    const graph: Map<number, Array<[number, number]>> = new Map();
    for (let i = 0; i < edges.length; i++) {
        const [a, b] = edges[i];
        const prob = succProb[i];
        if (!graph.has(a)) graph.set(a, []);
        if (!graph.has(b)) graph.set(b, []);
        graph.get(a)!.push([b, prob]);
        graph.get(b)!.push([a, prob]);
    }

    // 概率数组，初始化为0
    const probs = Array(n).fill(0);
    probs[start] = 1; // 起点的成功概率为1

    // 最大堆，用于存储[节点, 到该节点的成功概率]
    const pq: PriorityQueue<[number, number]> = new PriorityQueue<[number, number]>((a, b) => a[1] > b[1]);
    pq.insert([start, 1]);

    while (!pq.isEmpty()) {
        const [node, prob] = pq.extractMax()!;
        if (node === end) {
            return prob;
        }
        for (const [next, nextProb] of graph.get(node) || []) {
            // 如果通过当前节点到达相邻节点的概率更大
            if (probs[next] < probs[node] * nextProb) {
                probs[next] = probs[node] * nextProb;
                pq.insert([next, probs[next]]);
            }
        }
    }

    return 0;
}
