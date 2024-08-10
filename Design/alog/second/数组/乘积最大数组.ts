function maxProduct(nums: number[]): number {
  let curMax = nums[0];
  let curMin = nums[0];
  let finalMax = nums[0];

  for (const num of nums) {
    let tempMax = Math.max(num, curMax * num, curMin * num);
    curMin = Math.min(num, curMax * num, curMin * num);

    curMax = tempMax;

    finalMax = Math.max(finalMax, curMax);
  }

  return finalMax;
}
