/*  0405 : 1323. (easy) Maximum 69 Number  //  tag : Math

  Given a positive integer num consisting only of digits 6 and 9.

  Return the maximum number you can get by changing at most one digit (6 becomes 9, and 9 becomes 6).


  Constraints:
    1 <= num <= 10^4
    num's digits are 6 or 9.


  Follow up:
    Do not allocate extra space for another array. 
    You must do this by modifying the input array in-place with O(1) extra memory.


  Example 1:
    Input: num = 9669
    Output: 9969
    Explanation: 
      Changing the first digit results in 6669.
      Changing the second digit results in 9969.
      Changing the third digit results in 9699.
      Changing the fourth digit results in 9666. 
      The maximum number is 9969.

  Example 2:
    Input: num = 9996
    Output: 9999
    Explanation: Changing the last digit 6 to 9 results in the maximum number.

  Example 3:
    Input: num = 9999
    Output: 9999
    Explanation: It is better not to apply any change.

*/

/**
 * @param {number} num
 * @return {number}
 */

// 성공 : 5분 소요됨 (split(), join(), Number(), String() 및 for 반복문 등 여러번의 처리를 거쳤기에 비효율적일 수 있다고 생각함)
// Runtime: 76 ms, faster than 83.09% of JavaScript online submissions for Maximum 69 Number.
// Memory Usage: 38.8 MB, less than 27.09% of JavaScript online submissions for Maximum 69 Number.
var maximum69Number = function (num) {
  let splittedNum = String(num).split('');

  for (let i = 0; i < splittedNum.length; i++) {
    if (splittedNum[i] === '6') {
      splittedNum[i] = '9';
      break;
    }
  }

  return Number(splittedNum.join(''));
};

// ======================================================================================

// 다른 사람의 코드 : [JavaScript] Easy to understand - 3 solutions
// 3번째 방법은 별 의미가 없어서 삭제함

// SOLUTION 1 : We convert the number to string and replace the first '6' to '9'.
// replace()는 가장 처음 만나는 해당 조건이 성취되도록 하니까, 이렇게 간단히 마무리할 수 있었던 듯
const maximum69Number = (num) => Number(num.toString().replace('6', '9'));

// SOLUTION 2 : We check every digit of the number, if it's 6, we add value to make it be 9.
// 비트연산자를 활용하는 방법인 것 같다. 아직은 어렵게 느껴졌음
const maximum69Number = (num) => {
  if ((num / 1000) << 0 === 6) return num + 3000;
  if (((num / 100) << 0) % 10 === 6) return num + 300;
  if (((num % 100) / 10) << 0 === 6) return num + 30;
  if (num % 10 === 6) return num + 3;
  return num;
};

// ======================================================================================

// 다른 사람의 코드 : Very Simple JS Solution: 98%, 100%
var maximum69Number = function (num) {
  let str = num.toString();
  let res = str.replace('6', '9');
  return Number(res);
};

// ======================================================================================

// 다른 사람의 코드 : Simple Javascript Solution with Explanation
// https://youtu.be/mukSBqpIWks

// Solution 1
const maximum69Number = (num) => {
  let str = String(num);

  for (let i = 0; i < str.length; i++) {
    if (str[i] === '6') return str.replace('6', '9');
  }

  return Number(str);
};

// Solution 2
const maximum69Number = (num) => {
  let numStr = String(num).split('');
  let idx = numStr.findIndex((num) => num === '6');

  if (!numStr.includes('6')) {
    return num;
  }

  numStr[idx] = '9';

  return Number(numStr.join(''));
};
