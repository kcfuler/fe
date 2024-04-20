// 排序 + 处理区间起点、终点
function merge(intervals: number[][]): number[][] {
  intervals.sort((a: number[], b: number[]) => a[0] - b[0]);

  const merged: number[][] = [];
  for (const [from, to] of intervals) {
    if (!merged.length || merged[merged.length - 1][1] < from) {
      merged.push([from, to]);
    } else {
      merged[merged.length - 1][1] = Math.max(merged[merged.length - 1][1], to);
    }
  }


  return merged;
};