import {UnionFind} from "../../../../data_structure/UnionFind/UnionFind";

function equationsPossible(equations: string[]): boolean {
    // 1. 分为两个集合

    const uf = new UnionFind();
    for (const equation of equations) {
        if (equation[1] === '=') {
            const left = equation[0];
            const right = equation[3];

            uf.union(left, right);
        }
    }

    for (const equation of equations) {
        if (equation[1] === '!') {
            const left = equation[0];
            const right = equation[3];

            if (uf.isConnect(left, right)) {
                return false
            }
        }
    }

    return true;
}

console.log(equationsPossible(["a==b", "b!=a"]))
console.log(equationsPossible(["b==a", "a==b"]))
console.log(equationsPossible(["a==b", "b!=c", "c==a"]))
console.log(equationsPossible(["e!=c", "b!=b", "b!=a", "e==d"]))
