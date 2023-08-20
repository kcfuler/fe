/**
 * @param {string[]} words
 * @param {string} s
 * @return {boolean}
 */
var isAcronym = function (words, s) {
  let m = words.length,
    n = s.length;
  if (m !== n) return false;
  let i = 0,
    j = 0;

  while (i < m) {
    if (words[i][0] !== s[j]) return false;
    i++;
    j++;
  }

  return true;
};

/**
 * @test
 */

console.log(isAcronym(["never", "gonna", "give", "up", "on", "you"], "ngguoy"));
