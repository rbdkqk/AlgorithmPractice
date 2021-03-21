/*  0321 Mock Interview : 231. (easy) Power of Two  // tag : Math, Bit Manipulation

  Given an integer `n`, 
    return true if it is a power of two. Otherwise, return false.

  An integer `n` is a power of two, if there exists an integer `x` such that `n == 2x`.


  Constraints:
    -2^31 <= n <= 2^31 - 1


  Example 1:
    Input: n = 1
    Output: true
    Explanation: 2^0 = 1
  
  Example 2:
    Input: n = 16
    Output: true
    Explanation: 2^4 = 16

  Example 3:
    Input: n = 3
    Output: false

  Example 4:
    Input: n = 4
    Output: true

  Example 5:
    Input: n = 5
    Output: false

*/

/**
 * @param {number} n
 * @return {boolean}
 */

// 성공 : 15분 소요 (더 간단한 방법이 없을까? 1인 경우와 n <= 0인 경우를 따로 적어준 점이 아쉽다)
// Runtime: 136 ms
// Memory Usage: 40 MB
var isPowerOfTwo = function (n) {
  if (n === 1) {
    return true;
  } else if (n <= 0) {
    return false;
  }

  while (n > 2) {
    n = n / 2;
  }

  return n % 2 === 0;
};

// ======================================================================================

// 다른 사람의 코드 : JS One-Liner: Faster than 98%

/*  (MDN) Math.log2() : returns the base 2 logarithm of a number
  console.log(Math.log2(2));  // expected output: 1
  console.log(Math.log2(1));  // expected output: 0
*/
var isPowerOfTwo = function (n) {
  return Math.log2(n) % 1 === 0;
};

// ======================================================================================

// 다른 사람의 코드 : 100% fastest, 0ms, one line solution with explanation, binary trick
// 비트 연산을 하는 방식인 것 같다
let isPowerOfTwo = (n) => {
  return n > 0 ? !(n & (n - 1)) : false;
};
