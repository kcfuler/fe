/*
1. 同样使用双指针遍历所有情况
2. 和盛水最多的容器类似，先改变短板
*/
function trap(height: number[]): number {
    let left = 0, right = height.length - 1;
    let leftMax = 0, rightMax = 0;
    let result = 0;

    while (left < right) {
        if (height[left] < height[right]) {
            if (height[left] > leftMax) {
                leftMax = height[left];

            } else {
                // 增量
                result += leftMax - height[left];
            }
            left++;
        } else {
            if (height[right] > rightMax) {
                rightMax = height[right];
            } else {
                // 增量
                result += rightMax - height[right];
            }
            right--;
        }
    }

    return result;
}
