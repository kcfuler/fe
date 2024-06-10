/**
 * 使用贪心的思路
 * 依据：
 *  大饼干可以满足大孩子，也可以满足小孩子
 *  小饼干只能满足小孩子
 * 结论：
 *
 * */
function findContentChildren(g: number[], s: number[]): number {
    g.sort((a, b) => b - a)
    s.sort((a, b) => b - a);
    let ans = 0;

    let [i, j] = [0, 0];
    while (i < g.length && j < s.length) {
        if (s[j] >= g[i]) {
            ans++;
            j++;
            i++;
        } else {
            i++
        }
    }

    return ans
}