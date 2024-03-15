// 可以用两重翻转实现
function rotate(nums: number[], k: number): void {
  k = k % nums.length; // 规范化
  nums.reverse();
  myReverse(nums, 0, k);
  myReverse(nums, k + 1, nums.length - 1);
}

function myReverse(arr: number[], start: number, end: number): void {
  const swap = (i: number, j: number) => {
    let tmp = arr[i];
    arr[i] = arr[j];
    arr[j] = tmp;
  }
  for (let i = start, j = end; i < j; i++, j--) {
    swap(i, j);
  }
}