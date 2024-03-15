function findOrder(numCourses: number, prerequisites: number[][]): number[] {
    const graph: number[][] = new Array(numCourses).fill(null).map(() => []);
    const inDegree: number[] = new Array(numCourses).fill(0);

    for (const [course, prerequisite] of prerequisites) {
        graph[prerequisite].push(course);
        inDegree[course]++;
    }

    const que = inDegree.reduce((acc: number[], cur, currentIndex) =>{
        if (cur === 0) {
            acc.push(currentIndex);
        }
        return acc
    }, [])

    const res: number[]= [];
    while (que.length) {
        const top = que.shift()!;
        numCourses--;
        res.push(top);

        for (const to of graph[top]) {
            inDegree[to] --;
            if (inDegree[to] === 0) {
                que.push(to);
            }
        }
    }

    return numCourses === 0 ? res : [];
}