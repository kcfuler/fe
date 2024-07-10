let tmp = null;
function mergeSort(arr) {
  tmp = [...arr];
  merge(arr, 0, arr.length - 1);
}

function merge(arr, l, r) {
  if (l >= r) return;

  let mid = Math.floor((l + r) / 2);
  merge(arr, l, mid), merge(arr, mid + 1, r);

  let i = l,
    j = mid + 1,
    k = l;

  while (i <= mid && j <= r) {
    if (arr[i] <= arr[j]) tmp[k++] = arr[i++];
    else tmp[k++] = arr[j++];
  }
  while (i <= mid) tmp[k++] = arr[i++];
  while (j <= r) tmp[k++] = arr[j++];

  for (let i = l; i <= r; i++) arr[i] = tmp[i];
}

let arr = [38, 27, 43, 3, 9, 82, 10];
console.log("原始数组: ", arr);
mergeSort(arr);
console.log("排序后数组: ", arr);
