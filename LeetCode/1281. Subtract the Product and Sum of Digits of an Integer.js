/*  0108 : 1281. Subtract the Product and Sum of Digits of an Integer (easy)

  Given an integer number `n`, 
  return the difference between the product of its digits and the sum of its digits.


  Constraints:
    1 <= n <= 10^5


  Example 1:

    Input: n = 234
    Output: 15 
    Explanation: 
      Product of digits = 2 * 3 * 4 = 24 
      Sum of digits = 2 + 3 + 4 = 9 
      Result = 24 - 9 = 15

  Example 2:

    Input: n = 4421
    Output: 21
    Explanation: 
      Product of digits = 4 * 4 * 2 * 1 = 32 
      Sum of digits = 4 + 4 + 2 + 1 = 11 
      Result = 32 - 11 = 21

*/

/**
 * @param {number} n
 * @return {number}
 */

/*  내가 제출한 답

  시간복잡도 : O(n) : stringifiedN 문자열을 1회 순회함 (String(n) 처리에서도 순회가 들어간다면 1회 더 추가해서 2n이 될지도 모르겠음)
  공간복잡도 : O(1) : productOfDigits 변수와 sumOfDigits 변수에 값을 누적시키고 있다

  Runtime: 84 ms, faster than 20.57% of JavaScript online submissions for Subtract the Product and Sum of Digits of an Integer.
  Memory Usage: 39 MB, less than 7.00% of JavaScript online submissions for Subtract the Product and Sum of Digits of an Integer.

*/

var subtractProductAndSum = function (n) {
  let productOfDigits = 1;
  let sumOfDigits = 0;
  let stringifiedN = String(n);

  for (let i = 0; i < stringifiedN.length; i++) {
    productOfDigits *= Number(stringifiedN[i]);
    sumOfDigits += Number(stringifiedN[i]);
  }

  console.log(productOfDigits, sumOfDigits);

  return productOfDigits - sumOfDigits;
};

// ======================================================================================

// 다른 사람의 코드
// `Array.from(String(n), Number)` 부분은 잘 모르는 코드임 : 배열의 각 요소가 바로 숫자로 들어가니까 이후의 계산에서 더 효율적이라고 생각함

// Array.from() 메서드 : 유사 배열 객체(array-like object)나 반복 가능한 객체(iterable object)를 얕게 복사해 새로운 Array 객체를 만듭니다.
// https://developer.mozilla.org/ko/docs/Web/JavaScript/Reference/Global_Objects/Array/from
// syntax : Array.from(arrayLike[, mapFn[, thisArg]])

var subtractProductAndSum = function (n) {
  const digits = Array.from(String(n), Number);
  const sum = digits.reduce((a, b) => a + b);
  const product = digits.reduce((a, b) => a * b);
  return product - sum;
};

// ======================================================================================

// 다른 사람의 코드
// 내 코드와 컨셉은 비슷한데, `Number()` 대신 `parseInt()`를 활용했음
// 반복문보다 `reduce`같은 메소드가 복잡도에서 더 유리한지 공부 필요함
// 댓글 : let x = n.toString().split('').map(Number); - 이런 식으로, split 처리된 배열을 map으로 한바퀴 다시 돌면서 숫자로 바꿀 수도 있는 듯, 효율은 의문

var subtractProductAndSum = function (n) {
  let x = n.toString().split('');
  let y = x.reduce((a, b) => parseInt(a) * parseInt(b));
  let z = x.reduce((a, b) => parseInt(a) + parseInt(b));

  return y - z;
};
