/**
 * @param {string} s
 * @return {string[][]}
 */
var partition = function (s) {
  const ans = [];
  const path = [];

  const backTrack = (start) => {
    if (start === s.length) {
      ans.push([...path]);
      return;
    }

    for (let i = start; i < s.length; i++) {
      if (isPalindrome(s, start, i)) {
        path.push(s.slice(start, i + 1));
        backTrack(i + 1);
        path.pop();
      }
    }
  };

  const isPalindrome = (str, left, right) => {
    while (left < right) {
      if (str[left] !== str[right]) {
        return false;
      }
      left++, right--;
    }
    return true;
  };

  backTrack(0);

  return ans;
};
