/*  0316 Mock Interview : 461. (easy) Hamming Distance  // tag : Bit Manipulation

  The `Hamming distance` between two integers is the number of positions at which the corresponding bits are different.

  Given two integers `x` and `y`, calculate the Hamming distance.


  Note:
    0 ≤ x, y < 231.


  Example 1:
    Input: x = 1, y = 4

    Output: 2

    Explanation:
      1 - 0 0 0 1
      4 - 0 1 0 0
            ↑   ↑

      The above arrows point to positions where the corresponding bits are different.

*/

/**
 * @param {number} x
 * @param {number} y
 * @return {number}
 */
// 참고자료 : `Hamming distance` - https://en.wikipedia.org/wiki/Hamming_distance
// 참고자료 : `Hamming distance` - https://m.blog.naver.com/PostView.nhn?blogId=yagd_mirage&logNo=10042944461&proxyReferer=https:%2F%2Fwww.google.com%2F

// 성공 : 15분 소요 (`Hamming distance`의 개념과 2진수 변환 처리에 대한 공부 필요 / 비트 연산에 관해 안다면 더 쉽게 풀었을 듯)
// Runtime: 76 ms
// Memory Usage: 38.7 MB
var hammingDistance = function (x, y) {
  // 2진수로 바꾸기 참고자료 : https://stackoverflow.com/questions/9939760/how-do-i-convert-an-integer-to-binary-in-javascript
  let bitX = (x >>> 0).toString(2);
  let bitY = (y >>> 0).toString(2);

  if (bitX.length < bitY.length) {
    [bitX, bitY] = [bitY, bitX];
  }

  while (bitX.length !== bitY.length) {
    bitY = '0' + bitY;
  }

  let answer = 0;

  for (let i = 0; i < bitX.length; i++) {
    if (bitX[i] !== bitY[i]) {
      answer++;
    }
  }

  return answer;
};

// ======================================================================================

// 다른 사람의 코드 : JavaScript Clean Code No Bit Manipulation
// Bit Manipulation 없이 푸는 방법. 내 방법과 비슷하지 않나 생각함.
// String.prototype.padStart() : 현재 문자열의 시작을 다른 문자열로 채워, 주어진 길이를 만족하는 새로운 문자열을 반환합니다. 채워넣기는 대상 문자열의 시작(좌측)부터 적용됩니다.
// https://developer.mozilla.org/ko/docs/Web/JavaScript/Reference/Global_Objects/String/padStart
var hammingDistance = function (x, y) {
  let xBits = x.toString(2);
  let yBits = y.toString(2);

  let diff = 0;

  // 길이가 맞지 않으므로, 이를 맞추기 위해 앞에 0을 채워넣는 과정
  if (xBits.length > yBits.length) {
    yBits = yBits.padStart(xBits.length, '0');
  } else {
    xBits = xBits.padStart(yBits.length, '0');
  }

  for (let i = 0; i < xBits.length; i++) {
    if (xBits[i] !== yBits[i]) {
      diff++;
    }
  }

  return diff;
};

// ======================================================================================

// 다른 사람의 코드 : JavaScript faster than 98.91% (with bitwise operators)
// 비트 연산을 활용하는 방법. 아직 이 부분은 공부가 부족하다
var hammingDistance = function (x, y) {
  let value = x ^ y;
  let counter = 0;

  while (value != 0) {
    if (value & 1) ++counter;

    value = value >> 1;
  }

  return counter;
};
