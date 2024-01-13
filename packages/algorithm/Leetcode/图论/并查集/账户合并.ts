class UnionFind {
    private parent: Map<string, string>;

    constructor() {
        this.parent = new Map();
    }

    public find(x: string): string {
        if (!this.parent.has(x)) {
            this.parent.set(x, x);
        } else if (this.parent.get(x) !== x) {
            this.parent.set(x, this.find(this.parent.get(x)!));
        }
        return this.parent.get(x)!;
    }

    public union(x: string, y: string): void {
        const rootX = this.find(x);
        const rootY = this.find(y);
        if (rootX !== rootY) {
            this.parent.set(rootX, rootY);
        }
    }
}

function accountsMerge(accounts: string[][]): string[][] {
    const uf = new UnionFind();
    const emailToName = new Map<string, string>();
    const rootEmailToAccount = new Map<string, Set<string>>();

    // Step 1: Map each email to a name and union emails in the same account
    for (const account of accounts) {
        const name = account[0];
        for (let i = 1; i < account.length; i++) {
            if (!emailToName.has(account[i])) {
                emailToName.set(account[i], name);
            }
            uf.union(account[1], account[i]);
        }
    }

    // Step 2: Group emails by their root email
    for (const email of emailToName.keys()) {
        const rootEmail = uf.find(email);
        if (!rootEmailToAccount.has(rootEmail)) {
            rootEmailToAccount.set(rootEmail, new Set<string>());
        }
        rootEmailToAccount.get(rootEmail)!.add(email);
    }

    // Step 3: Sort and output the merged accounts
    const mergedAccounts: string[][] = [];
    for (const [rootEmail, emails] of rootEmailToAccount.entries()) {
        const sortedEmails = Array.from(emails).sort();
        const name = emailToName.get(rootEmail)!;
        mergedAccounts.push([name, ...sortedEmails]);
    }

    return mergedAccounts;
}