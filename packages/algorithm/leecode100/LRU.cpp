#include <iostream>
#include <unordered_map>

using namespace std;

struct Node {
    int key, value;
    Node* prev;
    Node* next;
    Node(int k, int v): key(k), value(v), prev(nullptr), next(nullptr) {}
};

class LRUCache {
private:
    unordered_map<int, Node*> hash;
    Node* head;
    Node* tail;
    int capacity;
    int size;

public:
    LRUCache(int capacity): capacity(capacity), size(0) {
        head = new Node(0, 0);
        tail = new Node(0, 0);
        head->next = tail;
        tail->prev = head;
    }

    int get(int key) {
        if (hash.find(key) == hash.end()) return -1;
        
        Node* node = hash[key];
        moveToHead(node);
        
        return node->value;
    }

    void put(int key, int value) {
        if (hash.find(key) != hash.end()) {
            Node* node = hash[key];
            node->value = value;
            moveToHead(node);
        } else {
            Node* newNode = new Node(key, value);
            hash[key] = newNode;
            addToHead(newNode);
            size++;
            
            if (size > capacity) {
                Node* node = removeTail();
                hash.erase(node->key);
                delete node;
                size--;
            }
        }
    }

private:
    void moveToHead(Node* node) {
        removeNode(node);
        addToHead(node);
    }

    void removeNode(Node* node) {
        node->prev->next = node->next;
        node->next->prev = node->prev;
    }

    void addToHead(Node* node) {
        node->prev = head;
        node->next = head->next;
        
        head->next->prev = node;
        head->next = node;
    }

    Node* removeTail() {
        Node* node = tail->prev;
        removeNode(node);
        return node;
    }
};

int main() {
    LRUCache cache(2);
    cache.put(1, 1);
    cache.put(2, 2);
    cout << cache.get(1) << endl;  // 输出 1
    cache.put(3, 3);  // 逐出 key 为 2 的缓存
    cout << cache.get(2) << endl;  // 输出 -1
    cache.put(4, 4);  // 逐出 key 为 1 的缓存
    cout << cache.get(1) << endl;  // 输出 -1
    cout << cache.get(3) << endl;  // 输出 3
    cout << cache.get(4) << endl;  // 输出 4
    return 0;
}
