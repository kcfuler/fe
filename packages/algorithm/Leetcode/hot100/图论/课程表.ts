/*
* 入度和出度的应用
* 注意需要构建邻接矩阵
* 条件：在BFS完成后，没有入度大于0的点
* */
function canFinish(numCourses: number, prerequisites: number[][]): boolean {
    const graph: number[][] = new Array(numCourses).fill(null).map(() => []);
    const inDegree = new Array(numCourses).fill(0);

    for (const [course, prerequisite] of prerequisites) {
        graph[prerequisite].push(course);
        inDegree[course]++;
    }

    const que: number[] = inDegree.reduce((acc: number[], cur: number, currentIndex: number) => {
        if (cur === 0) {
            acc.push(currentIndex)
        }
        return acc;
    }, []);

    while (que.length > 0) {
        numCourses--
        const top = que.shift()!;

        for (const to of (graph[top])) {
            inDegree[to]--;
            if (inDegree[to] === 0) {
                que.push(to);
            }
        }
    }

    return 0 === numCourses;
}