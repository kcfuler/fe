function quick_sort(arr, left, right) {
  if (left >= right) return;

  let x = arr[Math.floor((left + right) / 2)],
    i = left - 1,
    j = right + 1;

  while (i < j) {
    do {
      i++;
    } while (arr[i] < x);
    do {
      j--;
    } while (arr[j] > x);

    if (i < j) {
      swap(arr, i, j);
    }
  }

  quick_sort(arr, left, i - 1);
  quick_sort(arr, i + 1, right);
}

export function swap(arr, i, j) {
  let temp = arr[i];
  arr[i] = arr[j];
  arr[j] = temp;
}

let testArr = [3, 2, 1, 2, 3, 34, 4, 23, 4, 23, 4];
quick_sort(testArr, 0, testArr.length - 1);
console.log(testArr);
