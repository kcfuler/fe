class Solution {
  private origin: number[]
  private arr: number[]
  constructor(nums: number[]) {
    this.origin = nums.slice();
    this.arr = this.origin.slice();
  }

  reset(): number[] {
    this.arr = this.origin.slice();
    return this.arr;
  }

  /* 
  使用 random 随机交换即可
  */
  shuffle(): number[] {
    for (let i = this.arr.length - 1; i >= 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));

      [this.arr[i], this.arr[j]] = [this.arr[j], this.arr[i]];
    }

    return this.arr;
  }
}