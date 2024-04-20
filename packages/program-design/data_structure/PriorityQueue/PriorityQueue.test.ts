import { PriorityQueue } from './PriorityQueue'; // 假设你的优先队列类在这个路径

describe('PriorityQueue', () => {
    let pq: PriorityQueue<[number, number]>;

    beforeEach(() => {
        pq = new PriorityQueue<[number, number]>((a, b) => a[1] > b[1]);
    });

    test('starts empty', () => {
        expect(pq.isEmpty()).toBe(true);
        expect(pq.size()).toBe(0);
        expect(pq.peek()).toBeNull();
    });

    test('inserts items correctly', () => {
        pq.insert([1, 5]);
        expect(pq.isEmpty()).toBe(false);
        expect(pq.size()).toBe(1);
        expect(pq.peek()).toEqual([1, 5]);

        pq.insert([2, 10]);
        expect(pq.size()).toBe(2);
        expect(pq.peek()).toEqual([2, 10]);
    });

    test('extracts max correctly', () => {
        pq.insert([1, 5]);
        pq.insert([2, 10]);
        pq.insert([3, 7]);

        expect(pq.extractMax()).toEqual([2, 10]);
        expect(pq.extractMax()).toEqual([3, 7]);
        expect(pq.extractMax()).toEqual([1, 5]);
        expect(pq.extractMax()).toBeNull();
    });

    test('maintains heap property after extraction', () => {
        pq.insert([1, 5]);
        pq.insert([2, 10]);
        pq.insert([3, 7]);
        pq.insert([4, 2]);

        expect(pq.extractMax()).toEqual([2, 10]);
        expect(pq.peek()).toEqual([3, 7]);
        pq.insert([5, 12]);
        expect(pq.peek()).toEqual([5, 12]);
    });
});
