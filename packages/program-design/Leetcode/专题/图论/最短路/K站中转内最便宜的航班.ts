function findCheapestPrice(n: number, flights: number[][], src: number, dst: number, k: number): number {
    let price: number[] = new Array(n).fill(Number.MAX_VALUE);
    price[src] = 0;

    for (let i = 0; i <= k; i++) {
        const tmp = price.slice();

        for (const [from, to, cost] of flights) {
            if (price[from] < Number.MAX_VALUE) {
                tmp[to] = Math.min(price[from] + cost, tmp[to]);
            }
        }

        price = tmp;
    }

    return price[dst] === Number.MAX_VALUE ? -1 : price[dst];
}