/*  0113 : 20. Valid Parentheses (easy)

  Given a string `s` containing just the characters '(', ')', '{', '}', '[', ']', 
    determine if the input string is valid.

  An input string is valid if:
    Open brackets must be closed by the same type of brackets.
    Open brackets must be closed in the correct order.


  Constraints:
    1 <= s.length <= 10^4
    `s` consists of parentheses only '()[]{}'.


  Example 1:
    Input: s = "()"
    Output: true

  Example 2:
    Input: s = "()[]{}"
    Output: true

  Example 3:
    Input: s = "(]"
    Output: false

  Example 4:
    Input: s = "([)]"
    Output: false

  Example 5:
    Input: s = "{[]}"
    Output: true

*/

/**
 * @param {string} s
 * @return {boolean}
 */

/*  내가 제출한 답

  시간복잡도 : O(n) : s 문자열을 1회 순회한다
  공간복잡도 : o(n) : stack 배열에 s 문자열의 각 값이 모두 쌓이고 false가 나올수도 있다.

  Runtime: 84 ms, faster than 45.64% of JavaScript online submissions for Valid Parentheses.
  Memory Usage: 39.5 MB, less than 28.86% of JavaScript online submissions for Valid Parentheses.

*/

var isValid = function (s) {
  let stack = [];

  for (let i = 0; i < s.length; i++) {
    stack.push(s[i]);

    if (
      (stack[stack.length - 2] === '(' && stack[stack.length - 1] === ')') ||
      (stack[stack.length - 2] === '{' && stack[stack.length - 1] === '}') ||
      (stack[stack.length - 2] === '[' && stack[stack.length - 1] === ']')
    ) {
      stack.pop();
      stack.pop();
    }
  }

  if (stack.length > 0) {
    return false;
  }
  return true;
};

// ======================================================================================

// 다른 사람의 답
// 마지막 false/true를 `return !stack.length;` 이런식으로 한 줄로 처리할 수 있었음

var isValid = function (s) {
  const stack = [];
  const map = {
    '(': ')',
    '[': ']',
    '{': '}',
  };

  for (let i = 0; i < s.length; i++) {
    let c = s[i];
    if (map[c]) {
      stack.push(map[c]);
    } else if (c !== stack.pop()) {
      return false;
    }
  }

  return !stack.length;
};

// ======================================================================================

// 다른 사람의 답

var isValid = function (s) {
  const stack = [];

  for (let i = 0; i < s.length; i++) {
    let c = s.charAt(i);
    switch (c) {
      case '(':
        stack.push(')');
        break;
      case '[':
        stack.push(']');
        break;
      case '{':
        stack.push('}');
        break;
      default:
        if (c !== stack.pop()) {
          return false;
        }
    }
  }

  return stack.length === 0;
};
