/*  0319 Mock Interview : 1021. (easy) Remove Outermost Parentheses  // tag : Stack

  A valid parentheses string is either empty (""), "(" + A + ")", or A + B, 
    where A and B are valid parentheses strings, and + represents string concatenation.  

  For example, "", "()", "(())()", and "(()(()))" are all valid parentheses strings.

  A valid parentheses string `S` is primitive if it is nonempty, 
    and there does not exist a way to split it into S = A+B, with A and B nonempty valid parentheses strings.

  Given a valid parentheses string S, 
    consider its primitive decomposition: 
    S = P_1 + P_2 + ... + P_k, where P_i are primitive valid parentheses strings.

  Return S after removing the outermost parentheses of every primitive string in the primitive decomposition of S.

  
  Note:
    S.length <= 10000
    S[i] is "(" or ")"
    S is a valid parentheses string


  Example 1:
    Input: "(()())(())"
    Output: "()()()"
    Explanation: 
      The input string is "(()())(())", with primitive decomposition "(()())" + "(())".
      After removing outer parentheses of each part, this is "()()" + "()" = "()()()".
    
  Example 2:
    Input: "(()())(())(()(()))"
    Output: "()()()()(())"
    Explanation: 
      The input string is "(()())(())(()(()))", with primitive decomposition "(()())" + "(())" + "(()(()))".
      After removing outer parentheses of each part, this is "()()" + "()" + "()(())" = "()()()()(())".
    
  Example 3:
    Input: "()()"
    Output: ""
    Explanation: 
      The input string is "()()", with primitive decomposition "()" + "()".
      After removing outer parentheses of each part, this is "" + "" = "".

*/

/**
 * @param {string} S
 * @return {string}
 */

// 성공 : 15분 소요 (시간복잡도 : while 반복문이 큰 영향을 미치지는 않을 것으로 보이므로, 결국 O(n)이 될 것 같다. 다만, 공간복잡도가 불리함.)
// Runtime: 96 ms
// Memory Usage: 42.8 MB
var removeOuterParentheses = function (S) {
  let array = [];

  let stack = [];
  let currentString = '';

  for (let i = 0; i < S.length; i++) {
    currentString += S[i];
    stack.push(S[i]);

    if (stack.length >= 2) {
      while (stack[stack.length - 2] + stack[stack.length - 1] === '()') {
        stack.pop();
        stack.pop();
      }
    }

    if (stack.length === 0) {
      array.push(currentString);
      currentString = '';
    }
  }

  return array
    .map((each) => {
      return each.slice(1, -1);
    })
    .join('');
};

// ======================================================================================

// 내가 예전에 풀었던 코드 : 성공
// 오늘 작성한 코드와 큰 차이는 없는 것 같다
var removeOuterParentheses = function (S) {
  let answer = '';
  let stack = [];
  let start = 0;

  // if (stack.length === 0) { 그 때까지의 문자열을 앞뒤 빼서 담는다}
  for (let i = 0; i < S.length; i++) {
    stack.push(S[i]);

    while (stack[stack.length - 2] === '(' && stack[stack.length - 1] === ')') {
      stack.pop();
      stack.pop();
    }

    if (stack.length === 0) {
      answer += S.slice(start + 1, i); // 앞뒤로 하나씩은 잘라서 넣어준다
      start = i + 1;
    }
  }

  return answer;
};

// ======================================================================================

// 다른 사람의 코드 : Javascript solution - 98% faster
// 생각하지 못한 방법임
var removeOuterParentheses = function (S) {
  let parenthesCount = 0;
  let result = '';

  for (const letter of S) {
    if (letter === '(') {
      if (parenthesCount) {
        result += letter;
      }
      parenthesCount++;
    } else {
      parenthesCount--;
      if (parenthesCount) {
        result += letter;
      }
    }
  }

  return result;
};

// ======================================================================================

// 다른 사람의 코드 : JavaScript counter solution
// 위 코드와 같은 방법 같은데, 한눈에 이해되지 않음...
var removeOuterParentheses = function (S) {
  let counter = 0;
  let result = '';

  for (let i = 0; i < S.length; i++) {
    if (
      (S[i] === '(' && ++counter !== 1) ||
      (S[i] === ')' && --counter !== 0)
    ) {
      result += S[i];
    }
  }

  return result;
};
