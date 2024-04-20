/*
* 1. 2的次方数只有一个二进制位是1
* 2. 4的次方数也就是二的次方数的基础上，偶数位为1
* */
function isPowerFour(n) {
    return n > 0 && (n & (n - 1)) === 0 && (n & 0x55555555) !== 0;
}

console.log('5', isPowerFour(5))
console.log('6', isPowerFour(6))
console.log('8', isPowerFour(8))
console.log('1024', isPowerFour(1024))
console.log('64', isPowerFour(64))
