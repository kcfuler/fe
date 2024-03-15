import {UnionFind} from "../../../data_structure/UnionFind/UnionFind";

function smallestEquivalentString(s1: string, s2: string, baseStr: string): string {
    const uf = new UnionFind();

    for (let i = 0; i < s1.length; i++) {
        uf.union(s1[i], s2[i]);
    }

    let result = '';
    for (let i = 0; i < baseStr.length; i++) {
        result += uf.find(baseStr[i]);
    }

    return result;
}