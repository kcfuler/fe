/*
* 最大网络秩
* 概念：两个城市之间的网络秩定义为这两个城市 *直接* 相连的道路总数
* 题目：给你一个整数 n 和一个数组 roads ，
* 其中 roads[i] = [ai, bi] 表示从城市 ai 到 bi 的一条双向道路。
* */

/*
* 通过计算每两个城市之间的网络秩，返回 最大网络秩
* 在这里，网络秩 = 两个城市之间的道路总数 - 直接相连的道路总数
* */
function maximalNetworkRank(n: number, roads: number[][]): number {

    let degree = new Array(n).fill(0);
    let connected = new Map();

    for (const [city1, city2] of roads) {
        degree[city1]++;
        degree[city2]++;

        if (!connected.get(city1)) connected.set(city1, new Set());
        if (!connected.get(city2)) connected.set(city2, new Set());

        connected.get(city1).add(city2);
        connected.get(city2).add(city1);
    }

    let ans = 0;
    // 枚举所有城市对
    for (let i = 0; i < n; i++) {
        for (let j = i+1; j < n; j++) {
            let rank = degree[i] + degree[j];
            // 如果两个城市之间有道路，那么就减去一个重复的道路
            if (connected.get(i) && connected.get(i).has(j)) rank--;
            ans = Math.max(ans, rank);
        }
    }

    return ans;
}