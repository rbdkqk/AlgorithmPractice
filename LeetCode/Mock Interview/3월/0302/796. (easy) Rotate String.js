/*  0302 Mock Interview : 796. (easy) Rotate String  //  tag : ???

  We are given two strings, A and B.

  A shift on A consists of taking string A and moving the leftmost character to the rightmost position. 
    For example, if A = 'abcde', then it will be 'bcdea' after one shift on A. 
  
  Return True if and only if A can become B after some number of shifts on A.


  Note:
    A and B will have length at most 100.


  Example 1:
    Input: A = 'abcde', B = 'cdeab'
    Output: true

  Example 2:
    Input: A = 'abcde', B = 'abced'
    Output: false

*/

/**
 * @param {string} A
 * @param {string} B
 * @return {boolean}
 */

// 10분 정도 소요 - 매번 반복문이 실행될때마다 A.slice 처리를 해야 하므로, 시간복잡도에서 O(n^2)이 아닐까?
// Runtime: 80 ms, faster than 50.16% of JavaScript online submissions for Rotate String.
// Memory Usage: 38.9 MB, less than 29.39% of JavaScript online submissions for Rotate String.
var rotateString = function (A, B) {
  if (A === '' && B === '') return true;

  for (let i = 0; i < A.length; i++) {
    A = A.slice(1) + A[0];
    if (A === B) {
      return true;
    }
  }

  return false;
};

// ======================================================================================

// 다른 사람의 코드 : JavaScript Clean KMP Algorithm
var rotateString = function (A, B) {
  let j = 1,
    len = 0,
    lps = [0];
  // construct lps table for 'B'
  while (j < B.length) {
    if (B[j] === B[len]) {
      j++;
      len++;
      lps.push(len);
    } else if (len > 0) len = lps[len - 1];
    else {
      j++;
      lps.push(0);
    }
  }

  let i = 0;
  j = 0;
  // compare the two strings
  while (i < A.length) {
    if (A[i] === B[j]) {
      i++;
      j++;
    } else if (j > 0) j = lps[j - 1];
    else i++;
  }
  return B.slice(j) === A.slice(0, A.length - j);
};

// ======================================================================================

// 다른 사람의 코드 : JavaScript fast solution using KMP algorithm
var rotateString = function (A, B) {
  if (B === '') return true;

  const getLPS = (str) => {
    let i = 0;
    let j = 1;
    const pi = [0];

    while (j < str.length) {
      if (str[i] === str[j]) {
        i++;
        j++;
        pi.push(i);
      } else if (i > 0) {
        i = pi[i - 1];
      } else {
        pi.push(0);
        j++;
      }
    }
    return pi;
  };

  const lps = getLPS(B);
  let i = 0;
  let j = 0;

  while (i < A.length) {
    if (A[i] === B[j]) {
      i++;
      j++;
      if (i === A.length) {
        const rotate = B.slice(j) + B.slice(0, j);
        return rotate === A;
      }
    } else if (j > 0) {
      j = lps[j - 1];
    } else {
      i++;
    }
  }
  return false;
};
