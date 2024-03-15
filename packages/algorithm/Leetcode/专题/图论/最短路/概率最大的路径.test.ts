import { maxProbability } from './概率最大的路径'; // 假设你的函数在这个文件中

describe('maxProbability', () => {
    test('basic input', () => {
        expect(maxProbability(3, [[0, 1], [1, 2], [0, 2]], [0.5, 0.5, 0.2], 0, 2)).toBeCloseTo(0.25, 5);
    });

    test('unreachable end', () => {
        expect(maxProbability(3, [[0, 1]], [0.5], 0, 2)).toBe(0);
    });

    test('multiple paths', () => {
        expect(maxProbability(4, [[0, 1], [1, 2], [0, 3], [3, 2]], [0.5, 0.5, 0.4, 0.6], 0, 2)).toBeCloseTo(0.24, 5);
    });

    test('start equals end', () => {
        expect(maxProbability(1, [], [], 0, 0)).toBe(1);
    });

    test('complex graph', () => {
        expect(maxProbability(5, [[0, 1], [1, 2], [0, 2], [2, 3], [2, 4], [3, 4]], [0.5, 0.5, 0.2, 0.4, 0.3, 0.1], 0, 4)).toBeCloseTo(0.075, 5);
    });
});
