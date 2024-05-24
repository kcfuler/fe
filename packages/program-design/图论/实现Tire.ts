/*
* 主要的点在于TrieNode的数据结构
* 以及迭代的处理
* */
class TrieNode {
    children: Map<string, TrieNode>;
    isEndOfWord: boolean;

    constructor() {
        this.children = new Map<string, TrieNode>()
        this.isEndOfWord = false;
    }
}

class Trie {
    root: TrieNode;

    constructor() {
        this.root = new TrieNode();
    }

    insert(word: string): void {
        let current = this.root;
        for (const char of word) {
            if (!current.children.has(char)) {
                current.children.set(char, new TrieNode());
            }

            current = current.children.get(char)!;
        }
        current.isEndOfWord = true;
    }

    search(word: string): boolean {
        let current = this.root;
        for (const char of word) {
            if (!current.children.get(char)) {
                return false;
            }
            current = current.children.get(char)!;
        }

        return current.isEndOfWord;
    }

    startsWith(prefix: string): boolean {
        let current = this.root;
        for (const char of prefix) {
            if (!current.children.get(char)) {
                return false;
            }
            current = current.children.get(char)!;
        }

        return true;
    }
}

/**
 * Your Trie object will be instantiated and called as such:
 * var obj = new Trie()
 * obj.insert(word)
 * var param_2 = obj.search(word)
 * var param_3 = obj.startsWith(prefix)
 */