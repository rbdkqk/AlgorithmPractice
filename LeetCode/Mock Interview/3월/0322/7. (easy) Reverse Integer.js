/*  0322 Mock Interview : 7. (easy) Reverse Integer  // tag : Math

  Given a signed 32-bit integer `x`, return x with its digits reversed. 

  If reversing `x` causes the value to go outside the signed 32-bit integer range [-2^31, 2^31 - 1], then return 0.

  Assume the environment does not allow you to store 64-bit integers (signed or unsigned).


  Constraints:
    -2^31 <= x <= 2^31 - 1


  Example 1:
    Input: x = 123
    Output: 321

  Example 2:
    Input: x = -123
    Output: -321

  Example 3:
    Input: x = 120
    Output: 21

  Example 4:
    Input: x = 0
    Output: 0

*/

/**
 * @param {number} x
 * @return {number}
 */

// 성공 : 15분 소요 (`-2^31 < x < 2^31 - 1` 조건을 더 간결하게 표현할 수 없을까? // 문자열로 변환하지 말고 숫자를 바로 연산하면 좋겠다)
// Runtime: 88 ms
// Memory Usage: 40.2 MB
var reverse = function (x) {
  let originX = x;

  if (x < 0) {
    originX = originX * -1;
  }

  let stringX = originX.toString();

  let newX = '';

  for (let i = stringX.length - 1; i >= 0; i--) {
    newX = newX + stringX[i];
  }

  let newNumX = Number(newX);

  if (x < 0) {
    newNumX = newNumX * -1;
  }

  if (newNumX < -2147483647 || 2147483647 < newNumX) {
    return 0;
  }

  return newNumX;
};

// ======================================================================================

// 다른 사람의 코드 : Clean And Simple Javascript Solution
// 비트 연산자를 활용하는 if 조건문 부분은 나는 잘 몰랐다

// Math.sign() : 어떤 수의 부호를 반환합니다. 이것은 그 수가 양수, 음수 또는 0인지를 나타냅니다.
// (인수가 `양수, 음수, 양수인 영, 음수인 영`이면, 이 함수는 `1, -1, 0, -0`을 각각 반환합니다. 그렇지 않으면, NaN이 반환됩니다.)
var reverse = function (x) {
  const absReversed = Math.abs(x).toString().split('').reverse().join('');

  if (absReversed > 2 ** 31) {
    return 0;
  }

  return absReversed * Math.sign(x);
};

// ======================================================================================

// 다른 사람의 코드 : JavaScript solution [94, 83%] (no reverse string)
// 문자열 변환 없이 처리하므로 이게 더 유리할 듯. while 반복문 안의 내용을 공부할 필요가 있음
// Math.pow(2, 31) 방법으로도 처리 가능
function reverse(x) {
  const isNegative = x < 0;

  x = Math.abs(x);

  let ret = 0;

  while (x > 0) {
    const num = x % 10; // 나머지를 찾고,
    x = Math.floor(x / 10); // 몫을 찾아 갱신하고,
    ret *= 10; // 자리수를 올려주고
    ret += num; // 자리수 뒤에 나머지를 붙여준다
  }

  if (ret > Math.pow(2, 31)) {
    return 0;
  }

  return isNegative ? ret * -1 : ret;
}
