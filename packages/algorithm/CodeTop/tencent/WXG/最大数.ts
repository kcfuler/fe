function largestNumber(nums: number[]): string {
  const numsStr = nums.map(String);

  numsStr.sort((a: string, b: string) => {
    const order1 = a + b;
    const order2 = b + a;

    return order2.localeCompare(order1);
  })

  if (numsStr[0] === '0') {
    return '0'
  }

  return numsStr.join('');
}