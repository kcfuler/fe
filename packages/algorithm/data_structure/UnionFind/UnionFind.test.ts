import { UnionFind } from './UnionFind'; // 替换为实际文件路径

describe('UnionFind', () => {
  let uf: UnionFind;

  beforeEach(() => {
    uf = new UnionFind();
  });

  test('find() 方法在元素未出现时应该创建并返回该元素', () => {
    expect(uf.find('a')).toBe('a');
  });

  test('union() 方法应该能够合并两个不相连的元素', () => {
    uf.union('a', 'b');
    expect(uf.isConnect('a', 'b')).toBeTruthy();
  });

  test('isConnect() 方法应当在两个元素相连时返回 true', () => {
    uf.union('a', 'b');
    uf.union('b', 'c');
    expect(uf.isConnect('a', 'c')).toBeTruthy();
  });

  test('isConnect() 方法在两个元素不相连时应返回 false', () => {
    uf.union('a', 'b');
    expect(uf.isConnect('a', 'c')).toBeFalsy();
  });

  test('连续的 union() 操作应该能够形成一个连通分量', () => {
    uf.union('a', 'b');
    uf.union('c', 'd');
    uf.union('b', 'c');
    expect(uf.isConnect('a', 'd')).toBeTruthy();
  });

  test('find() 方法应该返回连接分量的根', () => {
    uf.union('a', 'b');
    uf.union('b', 'c');
    expect(uf.find('a')).toBe(uf.find('c'));
  });

  // ... 更多测试用例 ...
});

