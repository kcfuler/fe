function generateParenthesis(n: number): string[] {
    const res: string[] = []

    const dfs = (record: string, left: number, right: number) => {
        if (record.length === 2 * n) {
            res.push(record);
            return;
        }

        if (left < n) {
            dfs(record + '(', left + 1, right);
        }

        if (right < left) {
            dfs(record + ')', left, right + 1);
        }
    }

    dfs('', 0, 0);

    return res;
}