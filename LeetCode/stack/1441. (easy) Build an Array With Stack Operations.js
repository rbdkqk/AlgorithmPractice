/*  0212 : 1441. (easy) Build an Array With Stack Operations  //  tag : Stack

  Given an array `target` and an integer `n`. 
    In each iteration, you will read a number from `list = {1,2,3..., n}`.

  Build the `target` array using the following operations:
    - Push: Read a new element from the beginning list, and push it in the array.
    - Pop: delete the last element of the array.
    - If the target array is already built, stop reading more elements.

  Return the operations to build the target array. 
    You are guaranteed that the answer is unique.


  Constraints:
    1 <= target.length <= 100
    1 <= target[i] <= n
    1 <= n <= 100
    target is strictly increasing


  Example 1: 
    Input: target = [1,3], n = 3
    Output: ["Push","Push","Pop","Push"]
    Explanation: 
      Read number 1 and automatically push in the array -> [1]
      Read number 2 and automatically push in the array then Pop it -> [1]
      Read number 3 and automatically push in the array -> [1,3]

  Example 2:
    Input: target = [1,2,3], n = 3
    Output: ["Push","Push","Push"]
  
  Example 3:
    Input: target = [1,2], n = 4
    Output: ["Push","Push"]
    Explanation: You only need to read the first 2 numbers and stop.
  
  Example 4:
    Input: target = [2,3,4], n = 4
    Output: ["Push","Pop","Push","Push","Push"]

  (문제 추가설명)
    We want to recreate the array, target, 
      and to do this, we must iterate over the list [1,2,3,...,n], and at each value, 
      we MUST push that value onto the array we're building. 
      
    If it's a value we don't want in our final array, then we must pop it from the array we're building.

    For example, if we're building target=[1,4,5] and n = 7,
      we're iterating through the list of [1,2,3,4,5,6,7]. 
      We first push the 1, then we push 2 and pop it since we don't want it, 
        then push 3 and pop it since we don't want it, push 4 and keep it since we want it, 
        push 5 and keep it since we want it. 
        
      We can stop iterating through [1,2,3,4,5,6,7] since we have built [1,4,5]. 
    
    Your output array should denote the push's and pop's in text you did, i.e, you did a push op, you append 'Push' to your answer. So in this case, the output is ['Push', 'Push', 'Pop', 'Push', 'Pop', 'Push', 'Push'].

*/

/**
 * @param {number[]} target
 * @param {number} n
 * @return {string[]}
 */

/*  내가 작성한 코드

  시간복잡도 : O(2n => n) : stackTarget.reverse()에서 n, for 반복문에서 n
  공간복잡도 : O(3n => n) : stackTarget, stack, answer 3개의 변수 모두 n개만큼의 요소를 가질 수 있음

  Runtime: 80 ms, faster than 54.67% of JavaScript online submissions for Build an Array With Stack Operations.
  Memory Usage: 38.7 MB, less than 36.67% of JavaScript online submissions for Build an Array With Stack Operations.

*/
// 생각해 보니, 굳이 `stack` 배열까지 만들 필요는 없었음
var buildArray = function (target, n) {
  let stackTarget = target.reverse();

  let stack = [];
  let answer = [];

  for (let i = 1; i <= n; i++) {
    stack.push(i);
    answer.push('Push');

    if (i !== stackTarget[stackTarget.length - 1]) {
      stack.pop();
      answer.push('Pop');
    } else {
      stackTarget.pop();
    }

    if (stackTarget.length === 0) {
      break;
    }
  }

  return answer;
};

// ======================================================================================

// 다른 사람의 코드 : [JavaScript] Easy to understand - O(n) time, O(1) space
// `n`은 쓰지도 않네...
// && 기호가 연달아 나오는 부분이 이해가 되지 않음
const buildArray = (target, n) => {
  const ret = [];
  for (let i = 0, j = 1; i < target.length; ++i, ++j) {
    ret.push('Push');
    target[i] !== j && ret.push('Pop') && --i;
  }
  return ret;
};

// ======================================================================================

// 다른 사람의 코드 : typescript, easy to understand - w/ comments
function buildArray(target, n) {
  // result
  const res = [];
  // pointer for target numbers (so we know which ones we need still)
  let ptr = 0;
  // iterate from 1 to n
  for (let i = 1; i < n + 1; i++) {
    // check if this is the number we need
    if (target[ptr] === i) {
      res.push('Push');
      // check if ptr reached end of target, and increment
      if (++ptr === target.length) return res;
    } else {
      // we didn't need this number, so simulate a Push then Pop
      res.push('Push', 'Pop');
    }
  }

  return res;
}
