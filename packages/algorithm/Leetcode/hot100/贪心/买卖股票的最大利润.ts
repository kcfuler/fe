function maxProfit(prices: number[]): number {
    let minP = Number.MAX_VALUE;
    let ans = 0;

    prices.forEach((p) => {
        minP = Math.min(minP, p);
        ans = Math.max(ans, p - minP);
    })

    return ans;
}