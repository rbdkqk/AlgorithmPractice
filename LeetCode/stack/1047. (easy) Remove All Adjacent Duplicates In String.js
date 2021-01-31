/*  1047. (easy) Remove All Adjacent Duplicates In String  //  tag : Stack

  Given a string `S` of lowercase letters, 
    a duplicate removal consists of choosing two adjacent and equal letters, and removing them.

  We repeatedly make duplicate removals on `S` until we no longer can.

  Return the final string after all such duplicate removals have been made.  
    It is guaranteed the answer is unique.


  Constraints:
    1 <= S.length <= 20000
    `S` consists only of English lowercase letters.


  Example 1:
    Input: "abbaca"
    Output: "ca"
    Explanation: 
      For example, in "abbaca" we could remove "bb" since the letters are adjacent and equal, 
        and this is the only possible move.  
      The result of this move is that the string is "aaca", of which only "aa" is possible, 
        so the final string is "ca".

*/

/**
 * @param {string} S
 * @return {string}
 */

/*  내가 작성한 코드

  시간복잡도 : O(n) : S 문자열을 1회 순회하며, 그 중간중간 stack 배열에서는 pop() 처리만 있을 뿐임
  공간복잡도 : O(n) : stack 배열이나 return값은 최대 S 문자열과 길이가 같아질 수 있음

  Runtime: 108 ms, faster than 41.22% of JavaScript online submissions for Remove All Adjacent Duplicates In String.
  Memory Usage: 47.2 MB, less than 31.24% of JavaScript online submissions for Remove All Adjacent Duplicates In String.

*/
var removeDuplicates = function (S) {
  let stack = [];

  for (let i = 0; i < S.length; i++) {
    stack.push(S[i]);
    if (stack[stack.length - 2] === stack[stack.length - 1]) {
      stack.pop();
      stack.pop();
    }
  }

  return stack.join('');
};

// ======================================================================================

// 다른 사람의 코드 : JavaScript Stack Solution 60ms
var removeDuplicates = function (S) {
  let res = [];
  for (let i = 0; i < S.length; i++) {
    if (S[i] !== res[res.length - 1]) {
      res.push(S[i]);
    } else {
      res.pop();
    }
  }
  return res.join('');
};

// ======================================================================================

// 다른 사람의 코드 : [JavaScript] Easy to understand - 3 solutions
// (세번째 방법은 정규표현식이라서 제외했음)

// The first solution, we can solve it by using a stack. Here's the code.
const removeDuplicates = (s) => {
  const stack = [];
  for (const char of s) {
    stack[stack.length - 1] === char ? stack.pop() : stack.push(char);
  }
  return stack.join('');
};

// The second solution, we use 2 pointers. One for traversal and one for store result.
const removeDuplicates = (s) => {
  const arr = s.split('');
  let ans = 0;
  for (let i = 0; i < arr.length; ++i) {
    ans === 0 || arr[i] !== arr[ans - 1] ? (arr[ans++] = arr[i]) : --ans;
  }
  return arr.slice(0, ans).join('');
};
