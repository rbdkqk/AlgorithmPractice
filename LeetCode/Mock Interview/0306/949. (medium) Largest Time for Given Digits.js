/*  0306 Mock Interview : 949. (medium) Largest Time for Given Digits  //  tag : Math

  Given an array arr of 4 digits, 
    find the latest 24-hour time that can be made using each digit exactly once.

  24-hour times are formatted as "HH:MM", 
    where HH is between 00 and 23, 
    and MM is between 00 and 59. 
    
  The earliest 24-hour time is 00:00, and the latest is 23:59.

  Return the latest 24-hour time in "HH:MM" format.  
    If no valid time can be made, return an empty string.


  Constraints:
    arr.length == 4
    0 <= arr[i] <= 9


  Example 1:
    Input: A = [1,2,3,4]
    Output: "23:41"
    Explanation: 
      The valid 24-hour times are "12:34", "12:43", "13:24", "13:42", "14:23", "14:32", "21:34", "21:43", "23:14", and "23:41". Of these times, "23:41" is the latest.
  
  Example 2:
    Input: A = [5,5,5,5]
    Output: ""
    Explanation: There are no valid 24-hour times as "55:55" is not valid.

  Example 3:
    Input: A = [0,0,0,0]
    Output: "00:00"
    
  Example 4:
    Input: A = [0,0,1,0]
    Output: "10:00"

*/

/**
 * @param {number[]} arr
 * @return {string}
 */

// 실패 : 방법을 생각하지 못함
// 만들 수 있는 조합 중에서 2400보다 작은 최대값을 찾기(?)

// '순열'을 이용하는 다른 사람들의 코드를 봤으나, 이해가 되지 않아서 제출하지 않음

var largestTimeFromDigits = function (arr) {};

// ======================================================================================

// 다른 사람의 코드 : JavaScript permutation solution
// permutation(순열) - https://taesung1993.tistory.com/13
// 순열 알고리즘 부분이 핵심인데, 아래의 permutation 함수가 이해되지 않음
// https://leetcode.com/problems/largest-time-for-given-digits/discuss/513643/JavaScript-permutation-solution
var largestTimeFromDigits = function (A) {
  const times = permutation(A)
    .filter((a) => ((a[0] === 2 && a[1] < 4) || a[0] < 2) && a[2] < 6) // only keep valid times
    .map((a) => 60 * (a[0] * 10 + a[1]) + a[2] * 10 + a[3]); // convert to minutes

  return times.length ? convert(Math.max(...times)) : '';
};

// convert minutes back to time
const convert = (time) => {
  const m = time % 60;
  const m2 = m % 10;
  const m1 = (m - m2) / 10;
  const h = (time - m) / 60;
  const h2 = h % 10;
  const h1 = (h - h2) / 10;
  return `${h1}${h2}:${m1}${m2}`;
};

// Heap's algorithm to generate permutations
const permutation = (arr) => {
  const generate = (arr, n) => {
    if (n == 1) {
      result.push(arr.slice());
      return;
    }

    for (var i = 0; i < n; i++) {
      generate(arr, n - 1);
      if (n % 2 === 0) {
        [arr[i], arr[n - 1]] = [arr[n - 1], arr[i]];
      } else {
        [arr[0], arr[n - 1]] = [arr[n - 1], arr[0]];
      }
    }
  };

  const result = [];

  generate(arr, arr.length);

  return result;
};

// ======================================================================================

// 다른 사람의 코드 : [94.62%] JavaScript Clean Backtracking With Short Circuit Optimization
// 전혀 이해하지 못함
var largestTimeFromDigits = function (A) {
  let res = '';

  function permute(arr, str) {
    if (str.length === 4) {
      if (+str >= +res) res = str;
      return;
    }

    for (let i = 0; i < arr.length; i++) {
      if (!str.length && arr[i] > 2) continue;
      if (str.length == 1 && str[0] == '2' && arr[i] > 3) continue;
      if (str.length == 2 && arr[i] > 5) continue;
      permute([...arr.slice(0, i), ...arr.slice(i + 1)], str + arr[i]);
    }
  }

  permute(A, '');

  return res.slice(0, 2) + (res.length ? ':' : '') + res.slice(2);
};

// ======================================================================================

// 다른 사람의 코드 : Concise and Simple JS solution
// 전혀 이해되지 않음
var largestTimeFromDigits = function (A) {
  const convert = (h, m) => parseInt(h) * 60 + parseInt(m);

  const isValid = (h, m) => parseInt(h) <= 23 && parseInt(m) <= 59;

  let permutations = [];

  let max = 0;

  const check = (permutation) => {
    let h = permutation[0] + '' + permutation[1];
    let m = permutation[2] + '' + permutation[3];

    if (isValid(h, m)) {
      if (!max || convert(max[0], max[1]) < convert(h, m)) max = [h, m];
    }
  };

  const permute = (array, index) => {
    if (index == array.length) check([...array]);
    for (let i = index; i < array.length; i++) {
      [array[index], array[i]] = [array[i], array[index]];
      permute(array, index + 1);
      [array[index], array[i]] = [array[i], array[index]];
    }
  };

  permute(A, 0);

  return max ? max[0] + ':' + max[1] : '';
};
