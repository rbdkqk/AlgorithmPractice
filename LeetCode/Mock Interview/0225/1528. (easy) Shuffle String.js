/*  0225 Mock Interview : 1528. (easy) Shuffle String  //  tag : Sort

  Given a string `s` and an integer array `indices` of the same length.

  The string `s` will be shuffled 
    such that the character at the `ith` position moves to `indices[i]` in the shuffled string.

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

  Example 4:
    Input: s = "aaiougrt", indices = [4,0,2,6,7,3,1,5]
    Output: "arigatou"

  Example 5:
    Input: s = "art", indices = [1,0,2]
    Output: "rat"

*/

/**
 * @param {string} s
 * @param {number[]} indices
 * @return {string}
 */

/*  내가 작성한 코드 (5분 내외 소요)
  
  시간복잡도 : O(2n => n) : indices 배열을 1회 순회, answer.join('')에서 answer 배열을 1회 순회
  공간복잡도 : O(n) : n이 커질수록, answer 배열 및 join() 처리한 문자열 역시 길어진다

  Runtime: 92 ms
  Memory Usage: 40.3 MB

*/
var restoreString = function (s, indices) {
  let answer = [];

  for (let i = 0; i < indices.length; i++) {
    answer[indices[i]] = s[i];
  }

  return answer.join('');
};

// ======================================================================================

// 다른 사람의 코드 : My JavaScript Solution 99%
// 내 코드나 큰 차이는 나지 않는 것 같다
var restoreString = function (s, indices) {
  var len = indices.length;
  var str = new Array(len);
  for (let i = 0; i < len; i++) {
    str[indices[i]] = s[i];
  }
  return str.join('');
};

// ======================================================================================

// 다른 사람의 코드 : JS solution with reduce
const restoreString = (s, indices) =>
  s
    .split('')
    .reduce((acc, l, i) => {
      acc[indices[i]] = l;
      return acc;
    }, [])
    .join('');
