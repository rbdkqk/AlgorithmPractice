/*  1021. (easy) Remove Outermost Parentheses //  tag : Stack

  A valid parentheses string is either empty (""), "(" + A + ")", or A + B, 
    where `A` and `B` are valid parentheses strings,
    and `+` represents string concatenation.  
    
  For example, "", "()", "(())()", and "(()(()))" are all valid parentheses strings.

  A valid parentheses string `S` is primitive if it is nonempty, 
    and there does not exist a way to split it into `S = A+B`, 
    with `A` and `B` nonempty valid parentheses strings.

  Given a valid parentheses string `S`, 
    consider its primitive decomposition: `S = P_1 + P_2 + ... + P_k`, 
    where `P_i` are primitive valid parentheses strings.

  Return `S` after removing the outermost parentheses of every primitive string 
    in the primitive decomposition of `S`.


  Constraints:
    `S`.length <= 10000
    `S[i]` is "(" or ")"
    `S` is a valid parentheses string


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

/* 내가 작성한 코드

  시간복잡도 : O(n) : S 문자열을 한바퀴 돌면서, 조건이 맞을때에만 뒤에서 pop() 처리를 할 뿐임 + S 문자열을 slice() 처리함
  공간복잡도 : O(n) : S 문자열이 길어질수록, answer 문자열이 길어짐 / stack 배열 역시 S 문자열만큼 길어질 수 있음

  Runtime: 88 ms, faster than 40.52% of JavaScript online submissions for Remove Outermost Parentheses.
  Memory Usage: 40.7 MB, less than 48.69% of JavaScript online submissions for Remove Outermost Parentheses.

*/
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
// 이런 방법은 나는 전혀 생각하지 못했음
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

// 다른 사람의 코드
/*  설명 (위 코드와 비슷한 개념인 것 같다)
  The main logic behind this algo is to count levels of the parentheses, starting from level 0 to n.
  Since we want to exclude the outermost parentheses, then we only need to exclude parentheses at level 0.
  Other than that, we want to insert them to our answer.

  We only increase/decrease the level if we find a consecutive parentheses.
  For example if we find "((", that means we need to increase the parentheses' level
  otherwise if we find "))" then we decrease the level.

  Time complexity = O(n)
  Space complexity = O(n)
*/

var removeOuterParentheses = function (S) {
  let level = 0;
  let res = '';

  for (let i = 0; i < S.length; ++i) {
    if (S[i - 1] === '(' && S[i] === '(') {
      level++;
    } else if (S[i - 1] === ')' && S[i] === ')') {
      level--;
    }

    if (level > 0) {
      res += S[i];
    }
  }

  return res;
};

// ======================================================================================

// 다른 사람의 코드 : Javascript Solution using Stacks
/*  설명
  Create a stack & find substrings that match condition
  Store substrings in a seperate Array
  Loop through new array and use substring method to get final result
*/
var removeOuterParentheses = function (str) {
  let stack = [];
  let currSubString = '';
  let collection = [];

  for (let i = 0; i < str.length; i++) {
    if (str[i] === '(') {
      stack.push(str[i]);
      currSubString += str[i];
    } else if (str[i] === ')') {
      stack.pop();
      currSubString += str[i];

      if (stack.length === 0) {
        collection.push(currSubString);
        currSubString = '';
      }
    }
  }

  let finalString = '';
  for (let i = 0; i < collection.length; i++) {
    finalString += collection[i].substring(1, collection[i].length - 1);
  }

  return finalString;
};
