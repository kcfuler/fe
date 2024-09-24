/*
* 状态是 start 和 end，枚举所有状态，校验每一个状态
* */
function partition(s: string): string[][] {
    const res: string[][] = [];
    const state: string[] = [];

    const checkState = (l: number, r: number) => {
        while (l < r) {
            if (s[l] !== s[r]) {
                return false;
            }
            l++;
            r--;
        }
        return true;
    }
    const backTrack = (start: number) => {
        // 找到答案
        if (start >= s.length) {
            res.push([...state]);
            return;
        }

        for (let end = start; end < s.length; end++) {
            // 检验是否符合题目要求（剪枝）
            if (checkState(start, end)) {
                state.push(s.slice(start, end + 1));
                backTrack(end + 1);
                state.pop();
            }
        }
    }

    backTrack(0);
    return res;
}

