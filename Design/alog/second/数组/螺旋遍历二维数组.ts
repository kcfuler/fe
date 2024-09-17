function spiralArray(array: number[][]): number[] {
    if (!array.length || array.length === 0) return [];

    const n = array.length;
    const m = array[0].length;

    const result = [];

    let top = 0, bottom = n - 1;
    let left = 0, right = m - 1;

    while (left <= right && top <= bottom) {
        // 左 -> 右
        for (let i = left; i <= right; i++) {
            result.push(array[top][i]);
        }
        top++;

        // 上 -> 下
        for (let i = top; i <= bottom; i++) {
            result.push(array[i][right]);
        }
        right--;

        // 右 -> 左
        // 注意上下有空间在再遍历左右
        if (top <= bottom) {
            for (let i = right; i >= left; i--) {
                result.push(array[bottom][i]);
            }
            bottom--;
        }

        // 下 -> 上
        // 同理
        if (left <= right) {
            for (let i = bottom; i >= top; i--) {
                result.push(array[i][left]);
            }
            left++;
        }

    }

    return result;
}