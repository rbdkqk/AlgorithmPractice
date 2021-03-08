/*  0308 Mock Interview : 13. (easy) Roman to Integer  //  tag : Math, String

  Roman numerals are represented by seven different symbols: I, V, X, L, C, D and M.

    Symbol       Value
      I             1
      V             5
      X             10
      L             50
      C             100
      D             500
      M             1000

  For example, 
    2 is written as II in Roman numeral, just two one's added together. 
    12 is written as XII, which is simply X + II. 
    The number 27 is written as XXVII, which is XX + V + II.

  Roman numerals are usually written largest to smallest from left to right. 
    However, the numeral for four is not IIII. 
    Instead, the number four is written as IV. 
    Because the one is before the five we subtract it making four. 
    The same principle applies to the number nine, which is written as IX. 
    
  There are six instances where subtraction is used:
    I can be placed before V (5) and X (10) to make 4 and 9. 
    X can be placed before L (50) and C (100) to make 40 and 90. 
    C can be placed before D (500) and M (1000) to make 400 and 900.
  
  Given a roman numeral, convert it to an integer.


  Constraints:
    1 <= s.length <= 15
    s contains only the characters ('I', 'V', 'X', 'L', 'C', 'D', 'M').
    It is guaranteed that s is a valid roman numeral in the range [1, 3999].


  Example 1:
    Input: s = "III"
    Output: 3

  Example 2:
    Input: s = "IV"
    Output: 4

  Example 3:
    Input: s = "IX"
    Output: 9

  Example 4:
    Input: s = "LVIII"
    Output: 58
    Explanation: L = 50, V= 5, III = 3.

  Example 5:
    Input: s = "MCMXCIV"
    Output: 1994
    Explanation: M = 1000, CM = 900, XC = 90 and IV = 4.

*/

/**
 * @param {string} s
 * @return {number}
 */

// 25분 소요
// Runtime: 160 ms
// Memory Usage: 44.7 MB
var romanToInt = function (s) {
  let reference = {
    I: 1,
    V: 5,
    X: 10,
    L: 50,
    C: 100,
    D: 500,
    M: 1000,
  };

  let answer = 0;

  let splitted = [];

  for (let i = 0; i < s.length; i++) {
    splitted[i] = reference[s[i]];
  }

  if (splitted.length % 2 !== 0) {
    splitted.push(0);
  }

  for (let j = 0; j < splitted.length; j++) {
    if (
      splitted[j + 1] &&
      (splitted[j] / splitted[j + 1] === 0.1 ||
        splitted[j] / splitted[j + 1] === 0.2)
    ) {
      answer += splitted[j + 1] - splitted[j];
      j++;
    } else {
      answer += splitted[j];
    }
  }

  return answer;
};

// ======================================================================================

// 다른 사람의 코드 : Simple JavaScript Solution Easy Understanding
// 한눈에 이해되진 않음
// 앞뒤의 숫자를 단순비교하는 방식인데, 1-5, 1-10은 맞는 방식이지만 1-50, 50-1000 이렇게는 틀린 답이 나올 것임
// 그러나, '로마자 표기의 기본 컨셉에서 1-50, 50-1000 이런 순서로 나열되지 않는다'는 점을 내가 모르니까 이런 방식을 못 떠올렸을 뿐임
symbols = {
  I: 1,
  V: 5,
  X: 10,
  L: 50,
  C: 100,
  D: 500,
  M: 1000,
};

var romanToInt = function (s) {
  value = 0;

  for (let i = 0; i < s.length; i += 1) {
    symbols[s[i]] < symbols[s[i + 1]]
      ? (value -= symbols[s[i]])
      : (value += symbols[s[i]]);
  }

  return value;
};
