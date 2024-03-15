function combinationSum(candidates: number[], target: number): number[][] {
    const res: number[][] = [];
    const backTrack = (state: number[], choices: number[], start: number) => {
        // 子集和等于 target 时，记录解
        if (target === 0) {
            res.push([...state])
            return
        }

        // 剪枝：从start开始遍历，避免生成重复子集
        for (let i = start; i < choices.length; i++) {
            // 若子集和超过 target，则直接结束循环，因为数组已经排序，后边元素更大，子集和一定超过 target
            if (target - choices[i] < 0) {
                break;
            }
            // 尝试：做出选择
            state.push(choices[i]);
            // 进行下一轮的选择
            backTrack(state, target - choices[i], choices, i);
            // 回退：撤销选择，恢复到之前的状态
            state.pop();
        }
    }

    // 排序，方便剪枝
    candidates.sort((a, b) => a - b);

    backTrack([], candidates, 0);

    return res;
}