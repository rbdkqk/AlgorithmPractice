/*  0307 Mock Interview : 22. (medium) Generate Parentheses  //  tag : String, Backtracking

  Given `n` pairs of parentheses, 
    write a function to generate all combinations of well-formed parentheses.


  Constraints:
    1 <= n <= 8


  Example 1:
    Input: n = 3
    Output: ["((()))", "(()())", "(())()", "()(())", "()()()"]

  Example 2:
    Input: n = 1
    Output: ["()"]

*/

/**
 * @param {number} n
 * @return {string[]}
 */

// 실패 : 방법이 잘 떠오르지 않는다 - 아래 방법에서, 모든 조합을 찾아내는 부분을 구현하는 방법을 모르겠음 (DFS? BackTracking?)
// 생각한 컨셉 : 'well-formed parentheses인지 검사하는 함수를 만든 뒤, n개의 () 기호로 만들 수 있는 모든 조합을 이 함수로 검사한다'
var generateParenthesis = function (n) {};

// ======================================================================================

// 다른 사람의 코드 : Clean JavaScript backtracking solution
// backtracking 코드 작성 방법을 더 공부할 필요가 있겠다...
function generateParenthesis(n) {
  const res = [];

  function go(l, r, s) {
    // l: left remaining, r: right remaining, s: string
    if (l > r) return; // The number of '(' should be always >= ')'

    if (l === 0 && r === 0) {
      res.push(s);
      return;
    }

    if (l > 0) go(l - 1, r, s + '(');
    if (r > 0) go(l, r - 1, s + ')');
  }

  go(n, n, '');

  return res;
}
