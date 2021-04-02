/*  0402 Mock Interview : 402. (medium) Remove K Digits  // tag : Stack, Greedy

  Given a non-negative integer num represented as a string, 
    remove k digits from the number so that the new number is the smallest possible.


  Note:
    The length of num is less than 10002 and will be ≥ k.
    The given num does not contain any leading zero.


  Example 1:
    Input: num = "1432219", k = 3
    Output: "1219"
    Explanation: Remove the three digits 4, 3, and 2 to form the new number 1219 which is the smallest.

  Example 2:
    Input: num = "10200", k = 1
    Output: "200"
    Explanation: Remove the leading 1 and the number is 200. Note that the output must not contain leading zeroes.

  Example 3:
    Input: num = "10", k = 2
    Output: "0"
    Explanation: Remove all the digits from the number and it is left with nothing which is 0.

*/

/**
 * @param {string} num
 * @param {number} k
 * @return {string}
 */

// 실패 : 접근법을 생각해 내지 못함 - 매 경우를 모두 찾는 방법은 극히 비효율적일 것임
var removeKdigits = function (num, k) {};

// ======================================================================================

// 다른 사람의 코드 : JavaScript stack solution
var removeKdigits = function (num, k) {
  const stack = [];
  let removed = 0;
  for (let n of num) {
    while (stack.length && n < stack[stack.length - 1] && removed < k) {
      stack.pop();
      removed += 1;
    }
    stack.push(n);
  }

  // remove all remaining large numbers
  while (removed < k) {
    stack.pop();
    removed += 1;
  }

  // remove all beginning zeroes
  while (stack.length && stack[0] === '0') {
    stack.shift();
  }

  return stack.length ? stack.join('') : '0';
};

// ======================================================================================

// 다른 사람의 코드 : Clear and simple explanation. Code runs 97.66% fast
/*
  Approach to this problem
    - start thinking using some simple inputes like "12345" and "54321" with k=1
    - observe with input "12345" and k=1. then answer is "1234"
    - observe with input "54321" and k=1. then answer is "4321"
    - Notice in both the cases we remove the maximum number occuring in increasing number sequence
    - like in "12345" we see 5 is largest
    - in "54321" 5 is largest, then 4 is largest, 3 is largest, "54..." is decreasing order but "5" itself is in increasing order. STILL confused in this lets solve an example

  Lets take and example "1432219" k= 2
  insert "1" in stack [1]
  4 is greater the stack top, push in stack, stack -> [1,4]
  3 is less the stack top pop stack top(4), stack top -> [1] , k-=1, k=1
  3 is greater then stack top, push in stack, stack -> [1,3]
  2 is less the stack top pop stack top(3), stack top -> [1] , k-=1, k=0

  k becomes 0, now push every element instack concat them and return stack [1,2,2,1,9]  
*/
function removeKdigits(string, k) {
  const split = string.split('');
  let stack = [];
  for (let i = 0; i < split.length; i++) {
    if (!stack.length || stack[stack.length - 1] <= split[i] || k === 0) {
      stack.push(split[i]);
    } else if (
      stack[stack.length - 1] > split[i] ||
      stack[stack.length - 1] == 0
    ) {
      stack.pop();
      k--;
      i--;
    }
  }
  while (k-- > 0) stack.pop();
  while (stack[0] == 0 && stack.length > 0) stack.shift();
  return stack.join('') || '0';
}
