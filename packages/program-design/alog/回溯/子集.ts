function subsets(nums: number[]): number[][] {
    const res: number[][] = [];

    const backTrack = (start: number, currentSubset: number[]) => {
        res.push([...currentSubset]);

        for (let i = start; i < nums.length; i++) {
            currentSubset.push(nums[i]);
            backTrack(i + 1, currentSubset);
            currentSubset.pop();
        }
    }

    backTrack(0, []);

    return res;
}