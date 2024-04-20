import { arraysEqual } from "./util";

function merge_sort(arr: number[]) {

  const temp = new Array(arr.length);
  const merge = (l: number, r: number) => {
    if (l >= r) {
      return;
    }

    let mid = Math.floor((l + r) / 2);
    merge(l, mid), merge(mid + 1, r);

    let k = 0, i = l, j = mid + 1;
    while (i <= mid && j <= r) {
      if (arr[i] >= arr[j]) temp[k++] = arr[j++];
      else temp[k++] = arr[i++];
    }
    while (i <= mid) temp[k++] = arr[i++];
    while (j <= r) temp[k++] = arr[j++];

    for (i = l, j = 0; i <= r; j++, i++) arr[i] = temp[j];
  }

  merge(0, arr.length - 1);
}

let testArray1: number[] = [];
merge_sort(testArray1);
console.assert(arraysEqual(testArray1, []), 'Test case 1 failed');

let testArray2 = [1];
merge_sort(testArray2);
console.assert(arraysEqual(testArray2, [1]), 'Test case 2 failed');

let testArray3 = [3, 6, 8, 7, 3, 5, 9, 4];
merge_sort(testArray3);
console.assert(arraysEqual(testArray3, [3, 3, 4, 5, 6, 7, 8, 9]), 'Test case 3 failed');

let testArray4 = [1, 2, 3, 4, 5, 6];
merge_sort(testArray4);
console.assert(arraysEqual(testArray4, [1, 2, 3, 4, 5, 6]), 'Test case 4 failed');

let testArray5 = [10, 9, 8, 7, 6, 5, 4, 3, 2, 1];
merge_sort(testArray5);
console.assert(arraysEqual(testArray5, [1, 2, 3, 4, 5, 6, 7, 8, 9, 10]), 'Test case 5 failed');

let testArray6 = [0, -1, 5, 7, -3, 2];
merge_sort(testArray6);
console.assert(arraysEqual(testArray6, [-3, -1, 0, 2, 5, 7]), 'Test case 6 failed');

console.log('All test cases passed!');