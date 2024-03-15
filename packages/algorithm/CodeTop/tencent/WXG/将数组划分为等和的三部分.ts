/* 
1. 检查数组是否能分成三个部分
2. 用(前缀 | 后缀)和的方式来判断是否有两个部分能够组成 targetSum
3. 如果(前缀 | 后缀)和都存在，且中间还有元素，中间元素和必然等于targetSum，得到答案
*/
function canThreePartsEqualSum(arr: number[]): boolean {
  let totalSum = arr.reduce((a, b) => a + b, 0);
  if (totalSum % 3 !== 0) return false;

  let targetSum = totalSum / 3;
  let firstSum = 0, secondSum = 0;
  let firstIndex = 0, secondIndex = arr.length - 1;

  // 从左到右找到第一个和为 targetSum的子数组
  while (firstIndex < secondIndex) {
    firstSum += arr[firstIndex];
    if (firstSum === targetSum) {
      break
    }
    firstIndex++;
  }

  // 从右到左找到第一个和为 targetSum 的子数组
  while (secondIndex > firstIndex) {
    secondSum += arr[secondIndex];
    if (secondSum === targetSum) break;
    secondIndex--;
  }

  return (firstSum === targetSum && secondSum === targetSum && firstIndex + 1 < secondIndex);

}