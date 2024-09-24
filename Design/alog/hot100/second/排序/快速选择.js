import { swap } from "./快速排序.js";
function quick_pick(arr, left, right, k) {
  if (left >= right) return arr[left];

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

  let sl = j - left + 1;
  if (sl >= k) {
    return quick_pick(arr, left, j, k);
  } else {
    return quick_pick(arr, j + 1, right, k - sl);
  }
}

// generate test case
function generateTestCase() {
  const n = 10;
  const k = 5;
  const arr = [];
  for (let i = 0; i < n; i++) {
    arr.push(i);
  }
  return [arr, k];
}
const [arr, k] = generateTestCase();
console.log(quick_pick(arr, 0, arr.length - 1, k), k);
