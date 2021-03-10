/*  0310 Mock Interview : 551. (easy) Student Attendance Record I  //  tag : String

  You are given a string `s` representing an attendance record for a student. 
  
  The record only contains the following three characters:
    'A': Absent.
    'L': Late.
    'P': Present.
  
  A student could be rewarded 
    if his attendance record does not contain more than one 'A' (absent) or more than two consecutive 'L' (late).

  Return true if the student could be rewarded according to his attendance record, and false otherwise.

  
  Constraints:
    1 <= s.length <= 1000
    s[i] is either 'A', 'L', or 'P'.


  Example 1:
    Input: s = "PPALLP"
    Output: true

  Example 2:
    Input: s = "PPALLL"
    Output: false

*/

/**
 * @param {string} s
 * @return {boolean}
 */

// 성공 - 10분 소요
// Runtime: 80 ms
// Memory Usage: 38.7 MB
var checkRecord = function (s) {
  let countA = 0;

  if (s.indexOf('LLL') !== -1) {
    return false;
  }

  for (let i = 0; i < s.length; i++) {
    if (s[i] === 'A') {
      countA++;

      if (countA === 2) {
        return false;
      }
    }
  }

  return true;
};

// ======================================================================================

// 다른 사람의 코드 : A few short JavaScript solutions
// 같은 글의 어러 코드 중, 하나만 기록함
// '0 + true = 1 / 0 + true + true = 2' 이런 식의 javascript 연산을 이용한 방법인 것 같다
var checkRecord = function (s) {
  let absentCount = 0;
  for (let i = 0; i < s.length && absentCount < 2; i++) {
    absentCount +=
      (s[i] === 'A') +
      2 * (s[i] === 'L' && s[i - 1] === 'L' && s[i - 2] === 'L');
  }
  return absentCount < 2;
};

// ======================================================================================

// 다른 사람의 코드 : JavaScript 1 line short solution without regex
// 코드는 훨씬 짧지만, 컨셉은 내 코드와 유사하지 않나 생각함
var checkRecord = function (s) {
  return s.split('').filter((s) => s == 'A').length <= 1 && !s.includes('LLL');
};
