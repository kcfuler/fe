function maxArea(height: number[]): number {
  let area = 0;
  let left = 0,
    right = height.length - 1;

  while (left < right) {
    const curArea = (right - left) * Math.min(height[left], height[right]);
    area = Math.max(area, curArea);

    if (height[left] < height[right]) {
      left++;
    } else {
      right--;
    }
  }

  return area;
}
