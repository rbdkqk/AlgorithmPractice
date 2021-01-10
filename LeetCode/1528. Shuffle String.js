/*  0107 : 1528. Shuffle String (easy)

  Given a string `s` and an integer array `indices` of the same length.
  The string `s` will be shuffled such that the character at the `ith` position moves to `indices[i]` in the shuffled string.
  Return the shuffled string.


  Constraints:
    s.length == indices.length == n
    1 <= n <= 100
    s contains only lower-case English letters.
    0 <= indices[i] < n
    All values of indices are unique (i.e. indices is a permutation of the integers from 0 to n - 1).


  Example 1:

    Input: s = "codeleet", indices = [4,5,6,7,0,2,1,3]
    Output: "leetcode"
    Explanation: As shown, "codeleet" becomes "leetcode" after shuffling.

  Example 2:

    Input: s = "abc", indices = [0,1,2]
    Output: "abc"
    Explanation: After shuffling, each character remains in its position.

  Example 3:

    Input: s = "aiohn", indices = [3,1,4,2,0]
    Output: "nihao"

*/

/**
 * @param {string} s
 * @param {number[]} indices
 * @return {string}
 */

/*  내가 제출한 답

  시간복잡도 : O(2n) => O(n) : s 문자열을 1회 순회하고, join 과정에서 splittedString 배열을 1회 더 순회함
  공간복잡도 : O(n) : splittedString 배열의 길이는 s 문자열의 길이와 동일함

  Runtime: 84 ms, faster than 88.47% of JavaScript online submissions for Shuffle String.
  Memory Usage: 40.5 MB, less than 38.30% of JavaScript online submissions for Shuffle String.

*/
var restoreString = function (s, indices) {
  let splittedString = [];

  for (let i = 0; i < s.length; i++) {
    splittedString[indices[i]] = s[i];
  }

  return splittedString.join('');
};

// ======================================================================================

/*  다른 사람의 답

  var restoreString = function (s, indices) {
    var len = indices.length;
    var str = new Array(len);
    for (let i = 0; i < len; i++) {
      str[indices[i]] = s[i];
    }
    return str.join('');
  };

  new Array 사용한 것 말고는 내 코드랑 큰 차이가 없어 보임
  실행해 봐도 비슷한 것 같다.

*/
