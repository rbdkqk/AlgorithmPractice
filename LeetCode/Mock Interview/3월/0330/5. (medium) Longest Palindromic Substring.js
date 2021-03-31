/*  0330 Mock Interview : 5. (medium) Longest Palindromic Substring  // tag : String, Dynamic Programming

  Given a string `s`, return the longest palindromic substring in s.


  Constraints:
    1 <= s.length <= 1000
    s consist of only digits and English letters (lower-case and/or upper-case),


  Example 1:
    Input: s = "babad"
    Output: "bab"
    Note: "aba" is also a valid answer.

  Example 2:
    Input: s = "cbbd"
    Output: "bb"

  Example 3:
    Input: s = "a"
    Output: "a"

  Example 4:
    Input: s = "ac"
    Output: "a"

*/

/**
 * @param {string} s
 * @return {string}
 */

// 실패 : 접근법을 찾지 못함 - 반복문을 중첩해서 돌리면서 회문 여부를 조회하면 되겠지만, 시간복잡도가 매우 높아질 것
var longestPalindrome = function (s) {
  if (s.length === 1) {
    return s;
  }

  for (var i = 0; i < s.length; i++) {
    let start = i;
    let end = s.length - 1;
    let endIndex = undefined;

    while (start < end) {
      if (s[start] !== s[end]) {
        end--;
      } else {
        if (!endIndex) {
          endIndex = end;
        }
        start++;
        end--;
      }

      if (
        (start === end && s.substring(i, endIndex + 1).length !== 0) ||
        (end - start === 1 && s[start] === s[end])
      ) {
        return s.substring(i, endIndex + 1);
      }
    }
  }
};

// ======================================================================================

// 다른 사람의 코드 : Intuitive JavaScript Solution with Expand around Center
// 매 시도의 i(index)로부터 양쪽으로 뻗어나가는 방식을 취한 것으로 보임
// 회문은 중심이 1개이거나 2개이다. 가운데 3개가 같은 경우는 가운데가 1개인 것임.
// 그래서 i만 가지고 또는 i와 i+1을 가지고, 2번씩 처리해서 양쪽으로 뻗어가며 회문을 찾아낸다
var longestPalindrome = function (s) {
  let longest = '';

  for (let i = 0; i < s.length; i++) {
    // palindrome can center around 1 or 2 letters
    const current1 = findLongestPalindrome(s, i, i);
    const current2 = findLongestPalindrome(s, i, i + 1);

    const longerPalindrome =
      current1.length > current2.length ? current1 : current2;
    if (longerPalindrome.length > longest.length) {
      longest = longerPalindrome;
    }
  }
  return longest;
};

const findLongestPalindrome = (str, i, j) => {
  while (i >= 0 && j < str.length && str[i] === str[j]) {
    i -= 1;
    j += 1;
  }
  // slice the qualified substring from the second last iteration
  return str.slice(i + 1, j);
};

// ======================================================================================

// 다른 사람의 코드 : Share my concise JavaScript solution
var longestPalindrome = function (s) {
  var max = '';

  for (var i = 0; i < s.length; i++) {
    for (var j = 0; j < 2; j++) {
      var left = i;
      var right = i + j;
      while (s[left] && s[left] === s[right]) {
        left--;
        right++;
      }
      if (right - left - 1 > max.length) {
        max = s.substring(left + 1, right);
      }
    }
  }
  return max;
};

// ======================================================================================

// 다른 사람의 코드 : Javascript DP
/* 
  Idea comes from optimizing recursive solution by remembering previous result. 
  Let's say we have a 2D array dp. 
  In each cell, it indicates whether range(i, j) can become a palindrome or not, where i, j denotes start and end index of the given string s. 
  We can build upon base cases and expand from there:

    base case with one character - dp[i][i] = true when i === j
    base case with two characters - dp[i][i+1] = true when s[i] === s[i+1]
    expand case with three or more characters - dp[i][j] = dp[i+1][j-1] && s[i] === s[j]
*/
// 2D DP
var longestPalindrome = function (s) {
  if (s.length <= 1) return s;

  // construct a 2D array
  const dp = [...new Array(s.length + 1)].map((_) =>
    new Array(s.length + 1).fill(false)
  );

  let lps = '';

  // base case for one character
  for (let i = 0; i < s.length; i++) {
    dp[i][i] = true;
    lps = s[i];
  }

  // base case for two characters
  for (let i = 0; i < s.length; i++) {
    if (s[i] === s[i + 1]) dp[i][i + 1] = true;
    if (dp[i][i + 1]) lps = s.substring(i, i + 2);
  }

  // expand to three or more characters
  for (let i = s.length - 1; i >= 0; i--) {
    for (let j = i + 2; j < s.length; j++) {
      dp[i][j] = dp[i + 1][j - 1] && s[i] === s[j];
      if (dp[i][j]) lps = lps.length < j - i + 1 ? s.substring(i, j + 1) : lps;
    }
  }

  return lps;
};
