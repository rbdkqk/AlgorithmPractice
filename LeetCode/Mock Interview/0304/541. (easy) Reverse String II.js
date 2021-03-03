/*  0304 Mock Interview : 541. (easy) Reverse String II  //  tag : String

  Given a string and an integer `k`, 
    you need to reverse the first `k` characters for every `2k` characters counting from the start of the string. 
    If there are less than `k` characters left, reverse all of them. 
    If there are less than `2k` but greater than or equal to `k` characters, then reverse the first `k` characters and left the other as original.


  Restrictions:
    The string consists of lower English letters only.
    Length of the given string and `k` will in the range [1, 10000]


  Example 1:
    Input: s = "abcdefg", k = 2
    Output: "bacdfeg"

*/

/**
 * @param {string} s
 * @param {number} k
 * @return {string}
 */

// 10분 정도 소요됨
// Runtime: 88 ms
// Memory Usage: 42.8 MB
var reverseStr = function (s, k) {
  let splittedS = s.split('');

  for (let i = 0; i < splittedS.length; i = i + 2 * k) {
    let start = i;
    let end = i + k - 1;

    while (start < end) {
      [splittedS[start], splittedS[end]] = [splittedS[end], splittedS[start]];
      start++;
      end--;
    }
  }

  return splittedS.join('');
};

// ======================================================================================

// 다른 사람의 코드 : Intuitive Javascript Solution
var reverseStr = function (s, k) {
  // 원래 답에는 아래 if문이 있었으나, 해당 글 댓글에서 이 부분은 없어도 된다고 하여 주석처리했음
  // if (k > s.length) return s.split('').reverse().join('');

  const split = s.split('');

  // reverse the segment and put it back
  for (let i = 0; i < s.length; i += 2 * k) {
    const reverse = split.splice(i, k).reverse();
    split.splice(i, 0, ...reverse);
  }

  return split.join('');
};

// ======================================================================================

// 다른 사람의 코드 : Simple JS Solution using substring
// 배열로 바꾸지 않고도, `substring()`을 활용해서 더 직관적으로 처리한 것 같다.
var reverseStr = function (s, k) {
  // 역시 위 문제와 마찬가지로, 아래 if문은 주석처리함
  // if (k > s.length) return s.split('').reverse().join('');

  for (let i = 0; i < s.length; i += 2 * k) {
    s =
      s.substring(0, i) +
      s.substr(i, k).split('').reverse().join('') +
      s.substring(i + k);
  }

  return s;
};
