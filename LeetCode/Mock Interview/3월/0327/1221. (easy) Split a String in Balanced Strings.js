/*  0327 Mock Interview : 1221. (easy) Split a String in Balanced Strings  // tag : String, Greedy

  Balanced strings are those that have an equal quantity of 'L' and 'R' characters.

  Given a balanced string s, split it in the maximum amount of balanced strings.

  Return the maximum amount of split balanced strings.


  Constraints:
    1 <= s.length <= 1000
    s[i] is either 'L' or 'R'.
    s is a balanced string.


  Example 1:
    Input: s = "RLRRLLRLRL"
    Output: 4
    Explanation: s can be split into "RL", "RRLL", "RL", "RL", each substring contains same number of 'L' and 'R'.

  Example 2:
    Input: s = "RLLLLRRRLR"
    Output: 3
    Explanation: s can be split into "RL", "LLLRRR", "LR", each substring contains same number of 'L' and 'R'.

    Example 3:
    Input: s = "LLLLRRRR"
    Output: 1
    Explanation: s can be split into "LLLLRRRR".

  Example 4:
    Input: s = "RLRRRLLRLL"
    Output: 2
    Explanation: s can be split into "RL", "RRRLLRLL", since each substring contains an equal number of 'L' and 'R'

*/

/**
 * @param {string} s
 * @return {number}
 */

// 성공 : 20분 소요 (객체를 이용하는 방법 말고 더 간단한 방법은 없을까?)
// Runtime: 76 ms
// Memory Usage: 38.8 MB
var balancedStringSplit = function (s) {
  let answer = 0;

  let obj = { R: 0, L: 0 };

  for (let i = 0; i < s.length; i++) {
    obj[s[i]] = obj[s[i]] + 1;

    if (obj['R'] === obj['L']) {
      answer++;
      obj['R'] = 0;
      obj['L'] = 0;
    }
  }

  return answer;
};

// ======================================================================================

// 다른 사람의 코드 : Two Javascript solutions: balance counter O(n) O(1) and stack O(n) O(n)

// Time: O(n) / Space: O(1)
// 내 방법과 유사해 보이지만, 난 객체를 새로 선언해서 관리했고 이 사람은 숫자 하나를 갱신하는 1개의 변수만으로 처리함
var balancedStringSplit = function (s) {
  let matches = 0;
  let balance = 0;

  for (let i = 0; i < s.length; i++) {
    if (s[i] === 'R') {
      balance -= 1;
    } else if (s[i] === 'L') {
      balance += 1;
    }

    if (balance === 0) {
      matches += 1;
    }
  }

  return matches;
};

// Using a stack data structure.
// Time: O(n) / Space: O(n)
var balancedStringSplit = function (s) {
  let matches = 0;
  const stack = [];

  stack.push(s[0]);

  for (let i = 1; i < s.length; i++) {
    const top = stack[stack.length - 1];

    if (top !== undefined && top !== s[i]) {
      stack.pop();
    } else {
      stack.push(s[i]);
    }

    if (stack.length === 0) {
      matches += 1;
    }
  }

  return matches;
};
