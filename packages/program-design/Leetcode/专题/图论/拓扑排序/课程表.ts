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
            inDegree[to] --;
            if (inDegree[to] === 0) {
                que.push(to);
            }
        }
    }

    return 0 === numCourses;
}

console.log(canFinish(3, [[0, 1], [0, 2], [1, 2]]));  // 应返回 true

// Test Case 2: 无法完成所有课程
console.log(canFinish(2, [[1, 0], [0, 1]]));  // 应返回 false
