let tmp = null;
function mergeSort(arr) {
  tmp = [...arr];
  merge(arr, 0, arr.length - 1);
}

function merge(arr, l, r) {
  if (l >= r) {
    return;
  }

  const mid = Math.floor((l + r) / 2);
  merge(arr, l, mid);
  merge(arr, mid + 1, r);

  let temp = new Array(arr.length);
  let [i, j, k] = [l, mid + 1, l];

  while (i <= mid && j <= r) {
    if (arr[i] <= arr[j]) temp[k++] = arr[i++];
    else temp[k++] = arr[j++];
  }

  if (i <= mid) temp[k++] = arr[i++];
  if (j <= r) temp[k++] = arr[j++];

  for (let i = l; i <= r; i++) arr[i] = temp[i];
}

let arr = [38, 27, 43, 3, 9, 82, 10];
console.log("原始数组: ", arr);
mergeSort(arr);
console.log("排序后数组: ", arr);
