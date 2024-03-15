export interface IUnionFind {
  find(x: string): string;
  union(x: string, y: string): void;
  isConnect(x: string, y: string): boolean;
}

export class UnionFind implements IUnionFind {
  private parent: Map<string, string>;
  constructor() {
    this.parent = new Map();
  }

  find(x: string): string {
    if (!this.parent.has(x)) {
      this.parent.set(x, x);
    } else if (this.parent.get(x) !== x) {
      // core
      this.parent.set(x, this.find(this.parent.get(x)!));
    }

    return this.parent.get(x)!;
  }

  union(x: string, y: string): void {
    const a = this.find(x);
    const b = this.find(y);

    if (a !== b) {
      if (a < b) {
        this.parent.set(b, a);
      } else {
        this.parent.set(a, b);
      }
    }
  }

  isConnect(x: string, y: string): boolean {
    return this.find(x) === this.find(y);
  }
}