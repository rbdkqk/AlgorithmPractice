/*  0303 Mock Interview : 9. (easy) Palindrome Number  //  tag : Math

  Given an integer `x`, return true if `x` is palindrome integer.

  An integer is a palindrome when it reads the same backward as forward. 
    For example, 121 is palindrome while 123 is not.


  Constraints:
    -2^31 <= x <= 2^31 - 1


  Example 1:
    Input: x = 121
    Output: true
  
  Example 2:
    Input: x = -121
    Output: false
    Explanation: From left to right, it reads -121. From right to left, it becomes 121-. Therefore it is not a palindrome.

  Example 3:
    Input: x = 10
    Output: false
    Explanation: Reads 01 from right to left. Therefore it is not a palindrome.

  Example 4:
    Input: x = -101
    Output: false

*/

/**
 * @param {number} x
 * @return {boolean}
 */

// 5분 정도 소요 - 문자열로 바꾸고 반복문을 돌렸는데, 이렇게 하지 않고 숫자 연산으로 더 유리하게 할 수는 없을까?
// Runtime: 228 ms
// Memory Usage: 48.7 MB
var isPalindrome = function (x) {
  if (x < 0) {
    return false;
  }

  let stringfyX = String(x);

  for (
    let i = 0, j = stringfyX.length - 1;
    i < stringfyX.length / 2;
    i++, j--
  ) {
    if (stringfyX[i] !== stringfyX[j]) {
      return false;
    }
  }

  return true;
};

// ======================================================================================

// 다른 사람의 코드 : No String or Array conversion, 4 Lines, 99.66% beat
// Use a varibale to reverse number then check with given number
// 뒤에서부터 탐색하면서, 각 수 자리의 숫자를 rev 변수에 더해나간 뒤 x와 비교하는 방식 (숫자를 연산하는 방식이니 훨씬 유리할 듯)
// 1의자리의 숫자부터 처리하지만, 실제 결과인 rev에는 가장 큰 단위의 숫자로 처리하게 된다
// (rev * 10 처리를 반복하므로, 가장 처음 처리한 1의자리 숫자가 최종적으로는 가장 큰 자리의 숫자로 들어감) - 어차피 이게 안맞으면 false가 된다
var isPalindrome = function (x) {
  if (x < 0) return false;

  let rev = 0;

  for (let i = x; i >= 1; i = Math.floor(i / 10)) {
    rev = rev * 10 + (i % 10);
  }

  return rev === x;
};
