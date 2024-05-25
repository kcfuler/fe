// 这个题有很多种做法
/*
* 1. 中心拓展法
* 2. 动态规划法
* */
function longestPalindrome(s: string): string {
    if (s.length < 2) {
        return s;
    }

    let start = 0, end = 0;

    // 中心拓展
    const expendAroundCenter = (left: number, right: number) => {
        while (left >= 0 && right < s.length && s[left] === s[right]) {
            left--;
            right++;
        }

        // 跳出循环时 left & right指向的字符并不相等
        if (end - start < right - left - 1) {
            start = left + 1;
            end = right - 1;
        }
    }

    for (let i = 0; i < s.length; i++) {
        // 假设回文长度是是奇数
        expendAroundCenter(i, i);
        expendAroundCenter(i, i + 1);
    }

    return s.substring(start, end + 1);
}