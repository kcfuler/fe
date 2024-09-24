// 使用双指针 + 贪心的思路来做
/* 
1. 首先，使用双指针，遍历所有情况
2. 两边包中间，面积取决于短板，所以遍历方向是去除短板
3. 对双指针的每一个量都这样做，得到答案
*/
function maxArea(height: number[]): number {
  let left = 0, right = height.length - 1;
  let maxArea = 0;

  while (left < right) {
    let curArea = (right - left) * Math.min(height[left], height[right]);
    maxArea = Math.max(curArea, maxArea);

    if (height[left] < height[right]) {
      left++;
    } else {
      right--;
    }
  }

  return maxArea;
}