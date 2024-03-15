function permute(nums: number[]): number[][] {
    const ans: number[][] = []
    const temp: number[] = [];
    const st = new Array(nums.length).fill(false);

    const dfs = () => {
        if (temp.length === nums.length) {
            ans.push([...temp])
            return
        }

        for (let i = 0; i < nums.length; i++) {
            if (st[i]) {
                continue;
            }
            st[i] = true;
            temp.push(nums[i]);
            dfs();
            temp.pop();
            st[i] = false;
        }
    }

    dfs();

    return ans;
};