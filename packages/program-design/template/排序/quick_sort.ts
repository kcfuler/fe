import { arraysEqual } from "./util";

function quick_sort(arr: number[]) {

  const swap = (i: number, j: number) => {
    const temp = arr[i];
    arr[i] = arr[j];
    arr[j] = temp;
  }

  const qSort = (l: number, r: number) => {
    if (l >= r)
      return;

    const partition = arr[Math.floor((l + r) / 2)];
    let i = l - 1, j = r + 1;

    while (i < j) {
      do { i++; } while (arr[i] < partition);
      do { j--; } while (arr[j] > partition);
      if (i < j) {
        swap(i, j);
      }
    }

    qSort(l, j);
    qSort(i + 1, r);
  }

  qSort(0, arr.length - 1);
}

let testArray1: number[] = [];
quick_sort(testArray1);
console.assert(arraysEqual(testArray1, []), 'Test case 1 failed');

let testArray2 = [1];
quick_sort(testArray2);
console.assert(arraysEqual(testArray2, [1]), 'Test case 2 failed');

let testArray3 = [3, 6, 8, 7, 3, 5, 9, 4];
quick_sort(testArray3);
console.assert(arraysEqual(testArray3, [3, 3, 4, 5, 6, 7, 8, 9]), 'Test case 3 failed');

let testArray4 = [1, 2, 3, 4, 5, 6];
quick_sort(testArray4);
console.assert(arraysEqual(testArray4, [1, 2, 3, 4, 5, 6]), 'Test case 4 failed');

let testArray5 = [10, 9, 8, 7, 6, 5, 4, 3, 2, 1];
quick_sort(testArray5);
console.assert(arraysEqual(testArray5, [1, 2, 3, 4, 5, 6, 7, 8, 9, 10]), 'Test case 5 failed');

let testArray6 = [0, -1, 5, 7, -3, 2];
quick_sort(testArray6);
console.assert(arraysEqual(testArray6, [-3, -1, 0, 2, 5, 7]), 'Test case 6 failed');

console.log('All test cases passed!');