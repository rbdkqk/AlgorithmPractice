/*  0212 : 682. (easy) Baseball Game  //  tag : Stack

  You are keeping score for a baseball game with strange rules. 
    The game consists of several rounds, where the scores of past rounds may affect future rounds' scores.

  At the beginning of the game, you start with an empty record. 
    You are given a list of strings `ops`, 
    where `ops[i]` is the `ith` operation you must apply to the record and is one of the following:
      1. An integer `x` - Record a new score of `x`.
      2. "+" - Record a new score that is the sum of the previous two scores. It is guaranteed there will always be two previous scores.
      3. "D" - Record a new score that is double the previous score. It is guaranteed there will always be a previous score.
      4. "C" - Invalidate the previous score, removing it from the record. It is guaranteed there will always be a previous score.
  
  Return the sum of all the scores on the record.


  Constraints:
    1 <= ops.length <= 1000
    ops[i] is "C", "D", "+", or a string representing an integer in the range [-3 * 10^4, 3 * 10^4].
    For operation "+", there will always be at least two previous scores on the record.
    For operations "C" and "D", there will always be at least one previous score on the record.


  Example 1: 
    Input: ops = ["5","2","C","D","+"]
    Output: 30
    Explanation:
      "5" - Add 5 to the record, record is now [5].
      "2" - Add 2 to the record, record is now [5, 2].
      "C" - Invalidate and remove the previous score, record is now [5].
      "D" - Add 2 * 5 = 10 to the record, record is now [5, 10].
      "+" - Add 5 + 10 = 15 to the record, record is now [5, 10, 15].
      The total sum is 5 + 10 + 15 = 30.

  Example 2:
    Input: ops = ["5","-2","4","C","D","9","+","+"]
    Output: 27
    Explanation:
      "5" - Add 5 to the record, record is now [5].
      "-2" - Add -2 to the record, record is now [5, -2].
      "4" - Add 4 to the record, record is now [5, -2, 4].
      "C" - Invalidate and remove the previous score, record is now [5, -2].
      "D" - Add 2 * -2 = -4 to the record, record is now [5, -2, -4].
      "9" - Add 9 to the record, record is now [5, -2, -4, 9].
      "+" - Add -4 + 9 = 5 to the record, record is now [5, -2, -4, 9, 5].
      "+" - Add 9 + 5 = 14 to the record, record is now [5, -2, -4, 9, 5, 14].
      The total sum is 5 + -2 + -4 + 9 + 5 + 14 = 27.

  Example 3:
    Input: ops = ["1"]
    Output: 1

*/

/**
 * @param {string[]} ops
 * @return {number}
 */

/*  내가 작성한 코드

  시간복잡도 : O(2n => n) : stack/ops 배열을 처리하기 위한 반복문에서 n, reduce에서 n
  공간복잡도 : O(n) : stack 배열은 ops 배열과 같은 길이일 수 있음

  Runtime: 80 ms, faster than 85.50% of JavaScript online submissions for Baseball Game.
  Memory Usage: 40.2 MB, less than 19.59% of JavaScript online submissions for Baseball Game.

*/
var calPoints = function (ops) {
  let stack = [];

  for (let eachOp of ops) {
    let length = stack.length;
    if (eachOp === '+') {
      stack.push(stack[length - 2] + stack[length - 1]);
    } else if (eachOp === 'D') {
      stack.push(stack[length - 1] * 2);
    } else if (eachOp === 'C') {
      stack.pop();
    } else {
      stack.push(Number(eachOp));
    }
  }

  return stack.reduce((acc, cur) => acc + cur);
};

// ======================================================================================

// 다른 사람의 코드 : javascript solution [faster than 90%]
var calPoints = function (ops) {
  let stack = [];
  ops.forEach((op) => {
    if (parseInt(op)) {
      stack.push(parseInt(op));
    } else if (op === '+') {
      stack.push(
        (stack[stack.length - 1] || 0) + (stack[stack.length - 2] || 0)
      );
    } else if (op === 'D') {
      stack.push((stack[stack.length - 1] || 0) * 2);
    } else if (op === 'C') {
      stack.pop();
    }
  });
  console.log(stack);
  return stack.reduce((a, v) => a + v, 0);
};

// ======================================================================================

// 다른 사람의 코드 : Javascript | Easy to understand | Faster than 97%
var calPoints = function (ops) {
  const record = [];
  for (const nextOp of ops) {
    switch (nextOp) {
      case 'C':
        record.pop();
        break;
      case 'D':
        const latest = record[record.length - 1];
        const doubled = parseInt(latest, 10) * 2;
        record.push(doubled);
        break;
      case '+':
        const prev = record[record.length - 1];
        const prevPrev = record[record.length - 2];
        const summed = parseInt(prev, 10) + parseInt(prevPrev, 10);
        record.push(summed);
        break;
      default:
        record.push(nextOp);
        break;
    }
  }
  return record.reduce((prev, next) => prev + parseInt(next, 10), 0);
};
